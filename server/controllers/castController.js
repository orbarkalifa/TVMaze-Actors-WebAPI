
const API_URL = process.env.EXT_API_URL 

export const getCast = async (req, res) => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    console.log(data);
    res.status(200).json({ data: data })
  } catch (error) {
    console.error("Error fetching data from tv maze api:", error);
    res.status(500).json({message: error.message})
  }
}
