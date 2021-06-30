const request = require('supertest')
const app = require('../routes/staffRoutes')

    test("Login Pass", async () => {
      const response = await request(app).post("http://localhost:4000/staffs/login").send({
        email: "uabarna@gmail.com",
        password: "Admin@23"
      })
      expect(response.statusCode).toBe(404)
    })

    test("Login Failed", async () => {
      const response = await request(app).post("http://localhost:4000/staffs/login").send({
        email: "uabarna@gmail.com",
        password: "Abarna@23"
      })
      expect(response.statusCode).toBe(200)
    })

    test("Get All Staffs", async () => {
      const response = await request(app).get("http://localhost:4000/staffs/")
      expect(response.statusCode).toBe(404)
    })