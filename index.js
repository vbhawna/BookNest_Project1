const { initializeDatabase } = require("./db/db.connect");
const bookRoutes = require("./routes/book.routes");
const genreRouter = require("./routes/genre.routes");
const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/books", bookRoutes);

app.use("/genres", genreRouter);

const PORT = 5000;

async function startServer() {
    try {
        await initializeDatabase();

        app.listen(PORT, () => {
            console.log("Server is running on Port: ", PORT);
        });

    } catch(error) {
        console.error("Failed to start Server:", error);
    }
}

startServer();

