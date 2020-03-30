const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises');

const courseSchema = new mongoose.Schema({
  name: String,
  author: String, 
  tags: [ String ],
  date: Date, 
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model('Course', courseSchema);
//comparsion operator

//eq (equal)
//ne (not equal)
//gt (geater then)
//gte (geater then equal)
//lt  (less than)
//lte (less than or equal to)
// in
//nin (not in)

//logical operator or,and
// price: { $gte: 15,$lte:10 }

//using regular expression
//start with khalid : /^khalid/
//ends with khan    : /khan$/i : Note#'i' for case insensitive
//conatin with      :/*by*/

async function getCourses() {
  return await Course
  .find({ isPublished: true })
  .or([  
    { price: { $gte: 15 } },
    { name: /.*by.*/i }
  ])
  .sort('-price')
  .select('name author price');
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
