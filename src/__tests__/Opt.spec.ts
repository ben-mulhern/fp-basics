import { Opt, Some, None, opt, some, none } from "../Opt"
import { Lazy, lazy } from "../Lazy"

describe("Opt", () => {
  describe("construction", () => {
    it("Blank string goes to None", () => {
      const opt1 = opt("")
      expect(opt1).toEqual(none())
    })

    it("False goes to None", () => {
      const opt1 = opt(false)
      expect(opt1).toEqual(none())
    })

    it("Zero goes to None", () => {
      const opt1 = opt(0)
      expect(opt1).toEqual(none())
    })

    it("Non-empty string goes to some", () => {
      const opt1 = opt("Hello World!")
      expect(opt1).toEqual(some("Hello World!"))
    })

    it("True goes to some", () => {
      const opt1 = opt(true)
      expect(opt1).toEqual(some(true))
    })

    it("1 goes to some", () => {
      const opt1 = opt(1)
      expect(opt1).toEqual(some(1))
    })
  })

  describe("getOrElse", () => {
    it("Some goes to itself", () => {
      const opt1 = opt(1)
      const alt = lazy(2)
      expect(opt1.getOrElse(alt)).toEqual(1)
    })

    it("None goes to the alternative", () => {
      const opt1 = opt(0)
      const alt = lazy(2)
      expect(opt1.getOrElse(alt)).toEqual(2)
    })
  })

  describe("getOrNull", () => {
    it("Some goes to itself", () => {
      const opt1 = opt(1)
      expect(opt1.getOrNull()).toEqual(1)
    })

    it("None goes to null", () => {
      const opt1 = opt(0)
      expect(opt1.getOrNull()).toEqual(null)
    })
  })

  describe("orElse", () => {
    it("Some goes to itself", () => {
      const opt1 = opt(1)
      const alt = lazy(opt(2))
      expect(opt1.orElse(alt)).toEqual(some(1))
    })

    it("None goes to null", () => {
      const opt1 = opt(0)
      const alt = lazy(opt(2))
      expect(opt1.orElse(alt)).toEqual(some(2))
    })
  })

  describe("get", () => {
    it("Fetches the value from Some", () => {
      const opt1 = opt(1)
      expect(opt1.get()).toEqual(1)
    })

    it("Throws an error on None", () => {
      const opt1 = opt(0)
      const f = () => opt1.get()
      expect(f).toThrow()
    })
  })

  describe("map", () => {
    it("Some maps to another Some", () => {
      const opt1 = opt(1)
      const f = (n: number): boolean => n >= 0
      expect(opt1.map(f)).toEqual(some(true))
    })

    it("None maps to None", () => {
      const opt1 = opt(0)
      const f = (n: number): boolean => n >= 0
      expect(opt1.map(f)).toEqual(none())
    })
  })
})

describe("flatMap", () => {
  it("Some flatMaps to another Some if function returns Some", () => {
    const opt1 = opt(1)
    const f = (n: number): Opt<number> => (n >= 0 ? some(2 * n) : none())
    expect(opt1.flatMap(f)).toEqual(some(2))
  })

  it("Some flatMaps to None if function returns None", () => {
    const opt1 = opt(-1)
    const f = (n: number): Opt<number> => (n >= 0 ? some(2 * n) : none())
    expect(opt1.flatMap(f)).toEqual(none())
  })

  it("None flatMaps to None", () => {
    const opt1 = opt(0)
    const f = (n: number): Opt<number> => (n >= 0 ? some(2 * n) : none())
    expect(opt1.flatMap(f)).toEqual(none())
  })

  describe("filter", () => {
    it("Some filters to some if true", () => {
      const opt1 = opt(1)
      const f = (n: number): boolean => n >= 0
      expect(opt1.filter(f)).toEqual(some(1))
    })

    it("Some filters to None if false", () => {
      const opt1 = opt(-1)
      const f = (n: number): boolean => n >= 0
      expect(opt1.filter(f)).toEqual(none())
    })

    it("None filters to None", () => {
      const opt1 = opt(0)
      const f = (n: number): boolean => n >= 0
      expect(opt1.filter(f)).toEqual(none())
    })
  })

  describe("toString", () => {
    it("Some string renders correctly", () => {
      const opt1 = opt(1)
      expect(opt1.toString()).toEqual("Some(1)")
    })

    it("None string renders correctly", () => {
      const opt1 = opt(0)
      expect(opt1.toString()).toEqual("None")
    })
  })
})
