const requestPictures = async () => {
  const picturesList = [];
  await fetch("https://api.pexels.com/v1/curated?per_page=80", {
    headers: {
      Authorization: "563492ad6f91700001000001e5f1bd59d911487dbd97382391e12ddd"
    }
  })
    .then(resp => {
      return resp.json()
    })
    .then(data => {
      data.photos.forEach((picture) => picturesList.push(picture.src.large))
    });
  return picturesList;
}

export default requestPictures;