const newCard = (author, firstLiker, totalLikes, comment1, comment2, postPhotos, description, timeStamp) => {
    const cardObj = {
        author: author.username,
        author_pic: author.profile_pic,
        story: author.has_story,
        first_like_name: firstLiker.username,
        first_like_pic: firstLiker.profile_pic,
        total_likes: totalLikes,
        comments: [comment1, comment2],
        photos: postPhotos,
        time_stamp: timeStamp,
        description: description
    }

    return cardObj;
}

export default newCard;