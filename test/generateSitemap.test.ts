import { expect, it } from "vitest"
import { getRoutes } from "../src/lib"

it("get simple structured routes", () => {
  const routes = getRoutes("./test/routes")
  const result = {
    "/": true,
    "/blogs": true,
    "/blogs/[id]": true,
    "/blogs/[id]/[post]": false,
    "/products": true,
    "/products/[id]": false
  }

  expect(routes).toStrictEqual(result)
})


it("get nested routes without +page.svelte between theme", () => {
  const routes = getRoutes("./test/nested")
  const result = {
    "/": true,
    "/pages": true,
    "/pages/[id]": false
  }
  expect(routes).toStrictEqual(result)
})

it("get nested routes without +page.svelte between theme", () => {
  const routes = getRoutes("./test/dynamic")
  const result = {
    "/": true,
    "/[...pages]": false
  }

  expect(routes).toStrictEqual(result)
})

it("get nested routes server only directory", () => {
  const routes = getRoutes("./test/serverRoutes")
  const result = {
    "/": true,
    "/pages": true,
    "/pages/[id]": false
  }


  expect(routes).toStrictEqual(result)
})
it("deep", () => {
  const routes = getRoutes("./test/deep")
  const result = {
    "/": true,
    "/[id]/[id]": true,
    "/[id]/[id]/[id]/[id]": false,
    "/[id]/[id]/[id]": true,
    "/[id]": true
  }


  expect(routes).toStrictEqual(result)
})