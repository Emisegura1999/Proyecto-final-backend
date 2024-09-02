const swaggerOptions = {
    definition: {
      openapi: "3.0.1",
      info: {
        title: "Documentacion API Ecommerce",
        description:
          "Ecommerce dedicada a la venta de Productos de Tecnologia",
      },
    },
    apis: ["./src/docs/**/*.yaml"],
  };

  module.exports = { swaggerOptions };