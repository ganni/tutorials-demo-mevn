// const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
const mongoose_fuzzy_searching = require("@rowboat/mongoose-fuzzy-searching");
module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
    },
    { timestamps: true }
  );

  // add text index for full text search
  schema.index({ title: "text", description: "text" });

  schema.plugin(mongoose_fuzzy_searching, { fields: ["title", "description"] });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
