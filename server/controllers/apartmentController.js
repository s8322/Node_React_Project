const Apartment = require("../models/Apartment")
const User = require("../models/User")
const { createAddress, getAllAddress, getAddressById, deleteAddress } = require("./address")

const createApartment = async (req, res) => {
    const { user, address, floor, price, description, img, size,numOfRooms, airDirections, options } = req.body
    if (!user || !address) {
        
        return res.status(400).json({ Message: 'missing required fields' })
    }
    const newAddress = await createAddress(address);
    
    const apartment = await Apartment.create({ user, address: newAddress._id, floor, price, description, img, size,numOfRooms, airDirections, options })
    if (apartment) {
        return res.status(201).json({ message: "The apartment has been added" })
    }
    else {
        return res.status(400).json({ message: "Invalid insertion" })
    }

}
const getAllApartment = async (req, res) => {
    const apartments = await Apartment.find().sort({ title: 1 }).populate('address').lean()
//     console.log(apartments.user);
//     const user = await User.findById(apartments.user).populate('address').lean()
// console.log(user);
    if (!apartments) {
        return res.status(400).json({ message: "No apartments found" })
    }
    res.json(apartments)
}
const getApartmentById = async (req, res) => {
    const { id } = req.params
    const apartment = await Apartment.findById(id).populate('address').lean()
    if (!apartment)
        return res.status(400).json({ message: "No apartment found" })
    res.json(apartment)
}
const updateApartment = async (req, res) => {
    const { _id, user, address, floor, price, description, img, size,numOfRooms, airDirections, options } = req.body
    if (!_id || !user || !address)
        return res.status(400).json({ message: 'missing required fields' })
    const apartment = await Apartment.findById(_id).exec()
    if (!apartment) {
        return res.status(400).json({ message: "No apartment found" })
    }
    apartment.user = user
    apartment.address = address
    apartment.floor = floor
    apartment.price = price
    apartment.description = description
    apartment.img = img
    apartment.size = size
    apartment.numOfRooms= numOfRooms
    apartment.airDirections = airDirections
    apartment.options = options
    const updatedApartment = await apartment.save()
    const apartments = await Apartment.find().lean()
    res.json(apartments)
}
const deleteApartment = async (req, res) => {
    const { _id } = req.body
    const apartment = await Apartment.findById(_id).exec()
    deleteAddress(apartment.address.toString())
    if (!apartment) {
        return res.status(400).json({ message: "No apartments found" })
    }
    const result = await apartment.deleteOne()
    const apartments = await Apartment.find().lean()
    res.json(apartments)
}
module.exports = {
    createApartment,
    getAllApartment,
    getApartmentById,
    updateApartment,
    deleteApartment
}

