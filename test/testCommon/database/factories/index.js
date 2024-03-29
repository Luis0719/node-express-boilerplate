/**
 * Class to create Sequelize.Models
 */
class Factory {
  /**
   * @param  {Sequelize.Model.Class} Model
   * @param  {Object} defaultAttrs={}
   * @param  {Object} hooks={}
   */
  constructor({ Model, defaultAttrs = {}, hooks = {} }) {
    if (!Model) {
      throw Error("Cannot create factory with undefined Model");
    }

    this.Model = Model;
    this.defaultAttrs = defaultAttrs;
    this.hooks = hooks;
  }

  /**
   * @param  {Object} attrs={}
   * @return {Sequelize.Model} created model
   */
  async create(attrs = {}) {
    attrs = Object.assign({}, this.defaultAttrs, attrs);
    const model = this.Model.build(attrs);

    const { preSave, postSave } = this.hooks;
    if (preSave) await preSave(model);

    try {
      await model.save();
    } catch (err) {
      console.log("Failed to create factory");
      console.log(err);
    }

    if (postSave) await postSave(model);

    return model;
  }

  /**
   * Build model without saving it
   * @param  {Object} attrs={}
   * @return {Sequelize.Model} built model
   */
  build(attrs = {}) {
    attrs = Object.assign({}, this.defaultAttrs, attrs);
    return this.Model.build(attrs);
  }
}

module.exports = {
  Action: new Factory(require("./Action")),
  ActionGroup: new Factory(require("./ActionGroup")),
  Role: new Factory(require("./Role")),
  RoleAction: new Factory(require("./RoleAction")),
  User: new Factory(require("./User")),
};
