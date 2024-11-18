const main = async (req, res) => {

    res.json({ message: "Hello, World!" });
}

const test = async (req, res) => {
    res.json({ message: "Hello, Test!1" });
}

module.exports = { main, test };