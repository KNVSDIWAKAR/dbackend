const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const user_data = {
  user_id: "diwakar_21BIT0734",
  email: "shanmuka.diwakar2021@vitstudent.ac.in",
  roll_number: "21BIT0734",
};

app.get("/", (req, res) => {
  res.send("API is up and running! Roll Number: 21BIT0734");
});

app.get("/bfhl", (req, res) => {
  res.json({ operation_code: "XYZ123" });
});

app.post("/bfhl", (req, res) => {
  const { data } = req.body;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message:
        "Invalid input. Expecting an array of characters and numbers in 'data'.",
    });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;

  data.forEach((item) => {
    if (!isNaN(item)) {
      numbers.push(item.toString());
    } else if (
      typeof item === "string" &&
      item.length === 1 &&
      /[a-zA-Z]/.test(item)
    ) {
      alphabets.push(item);
      if (item === item.toLowerCase()) {
        if (!highestLowercase || item > highestLowercase) {
          highestLowercase = item;
        }
      }
    }
  });

  res.json({
    is_success: true,
    user_id: user_data.user_id,
    email: user_data.email,
    roll_number: user_data.roll_number,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
