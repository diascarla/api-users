// import express from "express";
// import cors from "cors";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.post("/users", async (req, res) => {
//   await prisma.user.create({
//     data: {
//       email: req.body.email,
//       name: req.body.name,
//       age: req.body.age,
//     },
//   });

//   res.status(201).json(req.body);
// });

// app.get("/users", async (req, res) => {
//   let users = [];

//   if (req.query) {
//     users = await prisma.user.findMany({
//       where: {
//         name: req.query.name,
//         email: req.query.email,
//         age: req.query.age,
//       },
//     });
//   } else {
//     users = await prisma.user.findMany();
//   }

//   res.status(200).json(users);
// });

// app.put("/users/:id", async (req, res) => {
//   await prisma.user.update({
//     where: {
//       id: req.params.id,
//     },
//     data: {
//       email: req.body.email,
//       name: req.body.name,
//       age: req.body.age,
//     },
//   });

//   res.status(201).json(req.body);
// });

// app.delete("/users/:id", async (req, res) => {
//   await prisma.user.delete({
//     where: {
//       id: req.params.id,
//     },
//   });

//   res.status(200).json({ message: "Usuário deletado com sucesso!" });
// });

// app.listen(3000);

import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/users", async (req, res) => {
  try {
    await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });

    res.status(201).json(req.body);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user." });
  }
});

app.get("/users", async (req, res) => {
  let users = [];

  try {
    const { name, email, age } = req.query;
    const where = {};

    if (name) {
      where.name = name;
    }
    if (email) {
      where.email = email;
    }
    if (age) {
      const ageInt = parseInt(age, 10);
      if (!isNaN(ageInt)) {
        where.age = ageInt;
      } else {
        return res
          .status(400)
          .json({ message: "Age query parameter must be a number." });
      }
    }

    users = await prisma.user.findMany({
      where,
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users." });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });

    res.status(200).json(req.body);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user." });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user." });
  }
});

app.listen(3000);
