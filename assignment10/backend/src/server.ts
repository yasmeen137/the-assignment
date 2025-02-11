import dotenv from "dotenv";
import app from "./app"

dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
