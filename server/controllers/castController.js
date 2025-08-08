import { getCast } from '../services/actorsService.js'

export const handleGetCast = async (req, res) => {
  try {
    const data = await getCast()
    console.log(data);
    res.status(200).json({ data: data })
  } catch (error) {
    console.error("Error fetching data from tv maze api:", error);
    res.status(500).json({message: error.message})
  }
}
