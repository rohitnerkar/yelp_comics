const Comic = require('../models/comic');
const Comment = require('../models/comment');

const comic_seeds = [
  {
    title: "Watchmen",
    description: "I'm baby before they sold out mixtape lyft, shabby chic pitchfork palo santo ramps glossier 3 wolf moon narwhal same. Sartorial cloud bread crucifix vice, blackbird spyplane hexagon taiyaki pug thundercats vibecession +1 chambray venmo gentrify. Asymmetrical small batch venmo tbh gastropub air plant. Hella af hexagon marxism coloring book austin, craft beer DSA cornhole microdosing fit banjo pabst. Yuccie keffiyeh tote bag, cronut chartreuse mustache jianbing raw denim vexillologist butcher normcore tonx. Man bun vape normcore, hot chicken humblebrag church-key affogato hell of kitsch lo-fi letterpress. Meh banjo meditation, green juice gorpcore raclette butcher truffaut viral tilde.",
    author: "Alan Moore",
    publisher: "DC",
    date: "08-10-2024",
    series: "Watchman",
    issue: 1,
    genre: "superhero",
    color: true,
    image_link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFzIzAmdnGHdcJVjn1SVtltYebLRlLa0sr5A&s"
  },
  {
    title: "Batman: The Dark Knight Returns",
    description: "I'm baby before they sold out mixtape lyft, shabby chic pitchfork palo santo ramps glossier 3 wolf moon narwhal same. Sartorial cloud bread crucifix vice, blackbird spyplane hexagon taiyaki pug thundercats vibecession +1 chambray venmo gentrify. Asymmetrical small batch venmo tbh gastropub air plant. Hella af hexagon marxism coloring book austin, craft beer DSA cornhole microdosing fit banjo pabst. Yuccie keffiyeh tote bag, cronut chartreuse mustache jianbing raw denim vexillologist butcher normcore tonx. Man bun vape normcore, hot chicken humblebrag church-key affogato hell of kitsch lo-fi letterpress. Meh banjo meditation, green juice gorpcore raclette butcher truffaut viral tilde.",
    author: "Frank Miller",
    publisher: "DC",
    date: "10-10-2024",
    series: "The Dark Knight",
    issue: 1,
    genre: "superhero",
    color: true,
    image_link: "https://static.dc.com/2024-03/bat_hub_hero_bm85_4x3f.png",
  },
  {
    title: "Y: The Last Man",
    description: "I'm baby before they sold out mixtape lyft, shabby chic pitchfork palo santo ramps glossier 3 wolf moon narwhal same. Sartorial cloud bread crucifix vice, blackbird spyplane hexagon taiyaki pug thundercats vibecession +1 chambray venmo gentrify. Asymmetrical small batch venmo tbh gastropub air plant. Hella af hexagon marxism coloring book austin, craft beer DSA cornhole microdosing fit banjo pabst. Yuccie keffiyeh tote bag, cronut chartreuse mustache jianbing raw denim vexillologist butcher normcore tonx. Man bun vape normcore, hot chicken humblebrag church-key affogato hell of kitsch lo-fi letterpress. Meh banjo meditation, green juice gorpcore raclette butcher truffaut viral tilde.",
    author: "Brian K. Vaughn",
    publisher: "Vertigo",
    date: "12-09-2023",
    series: "Y: The Last Man",
    issue: 1,
    genre: "sci-fi",
    color: true,    
    image_link: "https://m.media-amazon.com/images/M/MV5BMzkxM2ViNTYtMjgzYS00NDM0LWI5YWEtNWZiOTI3YmU4Yjk5XkEyXkFqcGc@._V1_.jpg",
  },
];

const seed = async () => {
    await Comic.deleteMany();
    console.log("Deleted All The Comics!");

    await Comment.deleteMany();
    console.log("Delete All The Comments!");

    // for (const comic_seed of comic_seeds) {
    //     let comic = await Comic.create(comic_seed);
    //     console.log("Created a new comic:", comic.title);
    //     await Comment.create({
    //         text: "I ruved this Romic Rook",
    //         user: "scooby_doo",
    //         comicId: comic._id
    //     })
    //     console.log("Created a new comment");
    // }
};

module.exports = seed;
