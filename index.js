const { initializeDatabase } = require("./db/db.connect");
const bookRoutes = require("./routes/book.routes");
const genreRouter = require("./routes/genre.routes");
const express = require("express");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(async (req, res, next) => {
    console.log("Database middleware started.");

    try {
        await initializeDatabase();
        console.log("Database connected. Calling nex()");
        next();
    } catch(error) {
        console.log("Database Connection failed. Calling next(error).");
        next(error);
    }
})

app.use("/books", bookRoutes);

app.use("/genres", genreRouter);

app.use((error, req, res, next) => {
    console.error("Error-Handling middleware:", error);

    res.status(500).json({
        message: "Internal Server Error",
    });
});

if(require.main === module) {
    const PORT = 5000;

    app.listen(PORT, () => {
        console.log("Server is running on Port: ", PORT);
    });
}

module.exports = app;


