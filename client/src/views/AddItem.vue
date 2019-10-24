<template>
  <div id="addItemBlanket">
    <div id="addItemBox">
      <b-form-group id="addItemNameGroup" label="Item name:" label-for="addItemNameGroup">
        <b-form-input id="addItemName" required placeholder="Enter item name"></b-form-input>
      </b-form-group>

      <b-form-group
        id="addItemDescriptionGroup"
        label="Item Description:"
        label-for="addItemDescriptionGroup"
      >
        <b-form-textarea
          id="addItemDescription"
          required
          placeholder="Enter item description"
          rows="2"
          max-rows="3"
        ></b-form-textarea>
      </b-form-group>

      <b-form-group id="addItemImageGroup" label="Item image:" label-for="addItemImageGroup">
        <b-form-file
          id="addItemImage"
          type="file"
          ref="file"
          placeholder="Choose an image to upload"
        ></b-form-file>
      </b-form-group>

      <div id="addItemButtonGroup">
        <b-button type="submit" id="addItemSubmitButton">Submit</b-button>
        <b-button type="cancel" id="addItemCancelButton">Cancel</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
#addItemBlanket {
  display: flex;
  flex-direction: column;
  padding: 0px;
  align-items: center;
  font-family: "Nunito";
  color: #ffffff;
}
#addItemBox {
  max-width: 80%;
  font-family: "Nunito";
}
#addItemButtonGroup {
  margin-top: 20px;
}
#addItemSubmitButton {
  display: inline-block;
  background-image: linear-gradient(to bottom right, #74d680, #378b29);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
  text-align: left;
  font-family: "Nunito";
}
#addItemCancelButton {
  display: inline-block;
  background-image: linear-gradient(to bottom right, #ff0000, #990000);
  border: none;
  box-shadow: 0px 10px 10px -5px #111;
  text-align: left;
  font-family: "Nunito";
}
</style>