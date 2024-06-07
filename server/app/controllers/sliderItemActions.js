const tables = require("../../database/tables");

const browseSliderItems = async (request, response, next) => {
  try {
    const slider_items = await tables.Slider_item.readAllSliderItems();

    if (!slider_items) {
      response.status(404).json({ message: "No slider items found" });
    } else {
      response.status(200).json(slider_items);
    }
  } catch (error) {
    next(error);
  }
};

const readSliderItem = async (request, response, next) => {
  try {
    const { slider_item_id } = request.params;

    if (!slider_item_id) {
      response.status(400).json({ message: "Slider item ID is required" });
      return;
    }

    const slider_item = await tables.Slider_item.readSliderItem(slider_item_id);

    if (!slider_item) {
      response.status(404).json({ message: "Slider item not found" });
    } else {
      response.status(200).json(slider_item);
    }
  } catch (error) {
    next(error);
  }
};

const editSliderItem = async (request, response, next) => {
  try {
    const { slider_item_id } = request.params;
    const slider_item = request.body;

    if (!slider_item_id) {
      response.status(400).json({ message: "Slider item ID is required" });
      return;
    }

    const affectedRows = await tables.Slider_item.updateSliderItem(
      slider_item_id,
      slider_item
    );

    if (!affectedRows) {
      response.status(404).json({ message: "Slider item not found" });
    } else {
      response.status(200).json({ message: "Slider item updated" });
    }
  } catch (error) {
    next(error);
  }
};

const addSliderItem = async (request, response, next) => {
  try {
    const slider_item = request.body;

    if (!slider_item.title || !slider_item.image) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

    const insertId = await tables.Slider_item.createSliderItem(slider_item);

    if (!insertId) {
      response.status(404).json({ message: "Slider item not found" });
    } else {
      response.status(201).json({
        insertId,
        message: "Slider item added",
      });
    }
  } catch (error) {
    next(error);
  }
};

const destroySliderItem = async (request, response, next) => {
  try {
    const { slider_item_id } = request.params;

    if (!slider_item_id) {
      response.status(400).json({ message: "Slider item ID is required" });
      return;
    }

    const affectedRows =
      await tables.Slider_item.deleteSliderItem(slider_item_id);

    if (!affectedRows) {
      response.status(404).json({ message: "Slider item not found" });
    } else {
      response.status(200).json({ message: "Slider item deleted" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  browseSliderItems,
  readSliderItem,
  editSliderItem,
  addSliderItem,
  destroySliderItem,
};
