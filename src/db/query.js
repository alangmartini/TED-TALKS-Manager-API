const { connection } = require('./connection');

const getTalkers = async () => {
  const [result] = await connection.execute('SELECT * FROM talkers');

  const camelized = result.map((talker) => {
    const newTalker = { ...talker };

    newTalker.talk = {};

    newTalker.talk.rate = talker.talk_rate;
    newTalker.talk.watchedAt = talker.talk_watched_at;

    delete newTalker.talk_rate;
    delete newTalker.talk_watched_at;

    return newTalker;
  });
  return camelized;
};

module.exports = {
  getTalkers,
};