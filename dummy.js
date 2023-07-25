try {
  const file = req.files.file;
  var uniquefileName = Date.now() + "_" + file.name;
  var pathname = path.join(
    __dirname,
    "../public/uploads/TutorAddDocumentImage",
    uniquefileName
  );
  file.mv(pathname, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("successfull updated image");
    }
  });
  const data1 = await Add_document.updateOne(
    { _id: req.body._id },
    {
      $set: {
        title: obj.title,
        book: obj.book,
        subject: obj.subject,
        course: obj.course,
        price: obj.price,
        tag: obj.tag,
        updatedAt: Date(),
        image_name: uniquefileName,
      },
    }
  );
  res.status(200).json({
    message: "sussessfully updated data",
    status: 200,
  });
} catch (e) {
  res.status(200).json({
    message: e.message,
    status: 400,
  });
}

