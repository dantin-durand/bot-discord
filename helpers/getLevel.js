module.exports = {
  getLevel(count) {
    if (count < 14) {
      return "**cancer amateur :third_place: **";
    } else if (count >= 14 && count < 385) {
      return "**cancer intermédiaire :second_place: **";
    } else {
      return "**cancer confirmé :trophy: **";
    }
  },
};
