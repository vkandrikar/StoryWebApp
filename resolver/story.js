const db = require('../db/story');

let dbIndex = 0;
const availablePositions = ['top', 'right', 'bottom', 'left'];

const generateResponseObj = (nodeObj) => {
  if (nodeObj) {
    const resObj = {
      success: true
    };

    resObj["data"] = { ...nodeObj };
    return resObj;
  }
  return null;
}

const getDataForNodeId = (nodeId) => {
  const nodeObj = db.find((obj) => obj.id === nodeId);
  if (nodeObj) {
    return generateResponseObj(nodeObj);
  }

  return null;
}

const payloadValidation = (payload) => {
  let errMsg = '';
  if (!payload['message']) errMsg = `Param 'messge' required in request body`;
  else if (!payload['parentId']) errMsg = `Param 'parentId' required in request body`;
  else if (!payload['position']) errMsg = `Param 'position' required in request body`;
  else if (availablePositions.indexOf(payload['position']) === -1) errMsg = `position can be top, right, bottom or left`;

  return errMsg;
}

const createChildForNodeId = (payload) => {
  //error handling if parameters are missing...
  const errMsg = payloadValidation(payload);
  
  if (errMsg) {
    return { error: { message: errMsg } }
  }

  //create a new child obj...
  const childObj = {
    id: ++dbIndex,
    parentId: parseInt(payload.parentId),
    message: payload.message,
    children: {
      left: null,
      right: null,
      top: null,
      bottom: null
    }
  }

  //update parent with new child...
  const parentObj = db.find( obj => obj.id === parseInt(payload.parentId));

  if (parentObj) {
    parentObj['children'][payload.position] = {id: dbIndex, message: payload.message};
    db.push(childObj);

    return generateResponseObj(parentObj);
  }
  return { error: { message: "Invalid parentId" } };
}

module.exports = {
  getDataForNodeId,
  createChildForNodeId
};