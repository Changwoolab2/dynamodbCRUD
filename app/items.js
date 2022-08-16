const writeItemParams = (season, episode) => {
  return {
    TableName: "TEST_TABLE",
    Item: {
      Season: { N: season },
      Episode: { N: episode },
      NewThing: { N: "32" },
    },
  };
};

const getAnItemParams = (season, episode) => {
  return {
    TableName: "TEST_TABLE",
    Key: {
      Season: { N: season },
      Episode: { N: episode },
    },
  };
};

const updateItemParams = (season, episode, addNewCol, changeNewThing) => {
  return {
    TableName: "TEST_TABLE",
    Key: {
      Season: { N: season },
      Episode: { N: episode },
    },
    UpdateExpression: "set newCol = :val1, NewThing = :val2",
    ExpressionAttributeValues: {
      ":val1": { N: addNewCol },
      ":val2": { N: changeNewThing },
    },
  };
};

const deleteItemParams = getAnItemParams;

const scanParams = (tableName) => {
  return {
    TableName: tableName,
    ReturnConsumedCapacity: "TOTAL",
  };
};

module.exports = {
  writeItemParams,
  getAnItemParams,
  updateItemParams,
  deleteItemParams,
  scanParams,
};
