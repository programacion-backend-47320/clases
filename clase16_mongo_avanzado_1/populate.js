import mongoose from "mongoose";

import studentModel from "./models/students.model.js";
import courseModel from "./models/courses.model.js";

const uri = 'mongodb+srv://r2:NYHvpWtHcu.3f%40h@clusterr2.gj8v5sk.mongodb.net/'

const env = async() => {
    await mongoose.connect(uri, {
        dbName: 'myDB'
    })

    console.log('DB connected')

    // Crear un Estudiante
    // await studentModel.create({
    //     first_name: 'Mariano Christian',
    //     last_name: 'Camerlo Gaudi'
    // })
    
    // Crear un curso
    // await courseModel.create({
    //     title: "Defensa contra las artes oscuras",
    //     description: "Saber defenderse de ataques oscuros",
    //     difficulty: 5,
    //     topics: ["Spectro Patronus", "Expeliermus"],
    //     professor: "Lupin"
    // })

    // const student = await studentModel.findOne({_id: '6538662a4aa9435043751a1c'})
    // console.log(student)
    // student.courses.push({course: "6538664345619ec8a1812d94"})
    // const result = await studentModel.updateOne({_id: '6538662a4aa9435043751a1c'}, student)
    // console.log(result)

    const student = await studentModel.findOne({_id: '6538662a4aa9435043751a1c'})

    console.log(JSON.stringify(student, null, '\t'))

    process.exit()
}

env()