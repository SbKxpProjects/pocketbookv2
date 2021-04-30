const db = require("./server/db");
const {
  User,
  Event,
  ChatMessage,
  Book,
  UserBook,
  UserEvent,
} = require("./server/db/models");

async function seed() {
  await db.sync({ force: true });

  const users = [
    {
      firstName: "Selina",
      lastName: "Byeon",
      username: "byeonse",
      email: "selina@pocketbook.com",
      password: "password",
      image: "https://i.ibb.co/mvXzTLD/selina.jpg",
    },
    {
      firstName: "Catherine",
      lastName: "Martin",
      username: "csmart1986",
      email: "catherine@pocketbook.com",
      password: "password",
      image: "https://i.ibb.co/30jn0FW/catherine.jpg",
    },
    {
      firstName: "Sandy",
      lastName: "Dai",
      username: "sandaiiyahh",
      email: "sandy@pocketbook.com",
      password: "password",
      image: "https://i.ibb.co/KbPGTfK/sandy.jpg",
    },
    {
      firstName: "Kay",
      lastName: "XiongPachay",
      username: "hellokay27",
      email: "kay@pocketbook.com",
      password: "password",
      image: "https://i.ibb.co/h1GCBb2/kay.jpg",
    },
  ];

  const [selina, catherine, sandy, kay] = await User.bulkCreate(users, {
    returning: true,
  });

  const events = [
    {
      eventTitle: "Harry Potter and the Deathly Hallows",
      date: "2021-04-09",
      startTime: "15:45",
      endTime: "16:00",
      description:
        "Muggles of Pocketbook, what did you think of the series? What were you satisfied with the ending? Let's discuss our favorite scenes, characters, and more! If we have time, I would love to discuss which house you belong to!",
      hostId: 1,
      image: "https://i.ibb.co/YL7sfM1/harrypotter.jpg",
    },
    {
      eventTitle: "The Little Prince",
      date: "2021-04-10",
      startTime: "15:45",
      endTime: "16:00",
      description:
        "The Little Prince introduces a variety of philosohical concepts including authority, loneliness, and ownership. Did you read this classic? If so, what was your opinion of the book? Looking forward to discussing with you all!",
      hostId: 2,
      image: "https://i.ibb.co/9pgMGkM/thelittleprince.jpg",
    },
    {
      eventTitle: "And Then There Were None",
      date: "2021-05-27",
      startTime: "17:00",
      endTime: "18:00",
      description:
        "Welcome, our thrill seekers! Let's talk about an agatha Christie classic, and also the world's best-selling mystery. Were you able to identify the killer? Which alliances did you think were the strongest? Excited to chat with you all!",
      hostId: 1,
      image: "https://i.ibb.co/zZ6ff8q/andthentherewerenone.jpg",
    },
    {
      eventTitle: "Atomic Habits",
      date: "2021-7-15",
      startTime: "18:00",
      endTime: "20:00",
      description:
        "For those who have read Atomic Habits, how did you enjoy it? How much of what you read did you apply into your daily lives? Everyone is welcome to join in as we discuss building better habits and stopping bad ones.",
      hostId: 4,
      image: "https://i.ibb.co/NxCn16Q/atomichabits.jpg",
    },
    {
      eventTitle: "Becoming",
      date: "2021-8-20",
      startTime: "13:00",
      endTime: "15:00",
      description:
        "With oever 10,000,000 copies sold, what are your thoughts on the Michelle Obama's memoir, Becoming? I have came prepared with discussion questions so I look forward to meeting and chatting with you!",
      hostId: 3,
      image: "https://i.ibb.co/8dNyCBT/becoming.jpg",
    },
    {
      eventTitle: "Why We Sleep",
      date: "2021-9-02",
      startTime: "16:00",
      endTime: "18:00",
      description:
        "Do you think you are getting enough sleep every night? Because after reading this book, I am shocked at the impact sleep has on our lives. I would love to hear your inputs. Also, if you have any tips on getting a good night's rest, please share!",
      hostId: 4,
      image: "https://i.ibb.co/vhHkZbr/whywesleep.jpg",
    },
    {
      eventTitle: "To Kill A Mockingbird",
      date: "2021-10-16",
      startTime: "19:00",
      endTime: "20:00",
      description:
        "So... I finally read Haper Lee's classic and it definitely is a must read! For those who have read it and want to discuss, I would love to explore the themes of race, injustice, human nature, and more with everyone.",
      hostId: 2,
      image: "https://i.ibb.co/2S1SSxq/tokillamockingbird.jpg",
    },
    {
      eventTitle: "The Intelligent Investor",
      date: "2021-11-01",
      startTime: "17:00",
      endTime: "18:00",
      description:
        "Book was a little dense but interesting. I think I understand a bit more about investing, but would love some tips and your thoughts on it. Thanks yall, see you there!",
      hostId: 4,
      image: "https://i.ibb.co/bNn4pKF/intelligentinvestor.jpg",
    },
    {
      eventTitle: "Cracking the Coding Interview",
      date: "2021-11-15",
      startTime: "10:00",
      endTime: "11:00",
      description:
        "lol help. But in all seriouness, this was a solid book and I definitely learned a lot! For anyone who read it, have you also found it useful? I would love to chate and maybe we can find a time to code together too!",
      hostId: 3,
      image: "https://i.ibb.co/0ft34Dp/crackingthecoding.jpg",
    },
    {
      eventTitle: "Best Books of 2021",
      date: "2021-12-26",
      startTime: "12:00",
      endTime: "13:00",
      description:
        "Book lovers, I am so excited to discuss our top favorite reads of the year together! Were you able to meet your reading goals? What are your plans for 2022?",
      hostId: 2,
      image: "https://i.ibb.co/n0WtgXZ/2021books.jpg",
    },
  ];

  const [hogwarts, bookwritting, women] = await Event.bulkCreate(events, {
    returning: true,
  });
}
