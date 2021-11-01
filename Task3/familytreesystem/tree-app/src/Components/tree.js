import React, { useContext, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { useCallback } from "react";
import axios from "axios";
import UsersContext from "../Context/Globalstate";
var editdata = [];
var id = {};
const host = "http://localhost:4000/users";

//CSS Object
const style_r = {
  backgroundColor: "green",
  color: "white",
  height: "70%",
};

const male = {
  backgroundColor: "gray",
  color: "white",
  height: "70%",
};

const female = {
  backgroundColor: "pink",
  color: "#252500",
  height: "70%",
};

const searchTree = (element, matchingTitle) => {
  if (element.name == matchingTitle) {
    return element;
  } else if (element.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], matchingTitle);
    }
    return result;
  }
  return null;
};

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,

  Adddata,
  Delete,
}) => (
  <g>
    {/* `foreignObject` requires width & height to be explicitly set. */}
    <foreignObject {...foreignObjectProps}>
      <div
        style={{ height: "130px", marginTop: "10px" }}
        className="fle col al-center"
      >
        <div
          className="flex jus-cent al-center"
          style={
            nodeDatum == undefined
              ? null
              : nodeDatum.attributes.sex == "female"
              ? female
              : nodeDatum.attributes.sex == "male"
              ? male
              : style_r
          }
        >
          {" "}
          <h3
            // name="description"
            // defaultValue={nodeDatum.name}

            style={{
              outlineStyle: "none",
              fontSize: "16px",
              margin: "2px",
              fontWeight: "bold",
              width: "100%",
              height: "80%",
            }}
          >
            {nodeDatum.name}
          </h3>
        </div>

        <div
          className="flex jus-center al-center"
          style={{ height: "30%", border: "1px solid black" }}
        >
          {" "}
          {
            <div
              style={{ width: "100%", textAlign: "center", height: "30px" }}
              className="flex"
            >
              {/* <i
                onClick={() => Editdata(nodeDatum)}
                style={{
                  color: "green",
                  width: "33%",
                  fontSize: "small",
                  borderRadius: "20%",
                }}
              >
                EDIT
              </i> */}

              <i
                onClick={() => Adddata(nodeDatum, 1)}
                style={{
                  color: "blue",
                  width: "33%",
                  fontSize: "small",

                  borderRadius: "20%",
                }}
              >
                ADD
              </i>
              <i
                onClick={() => Delete(nodeDatum)}
                style={{
                  color: "red",
                  width: "33%",
                  fontSize: "small",
                  borderRadius: "20%",
                }}
              >
                DROP
              </i>
            </div>
          }
        </div>
      </div>
    </foreignObject>
  </g>
);
const containerStyles = {
  width: "100%",
  height: "100vh",
};
const nodeSize = { x: 120, y: 200 };
const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 10 };

const CenteredTree = () => {
  const Selecteduser = useContext(UsersContext);

  const [state, setState] = useState({});
  const [data, setData] = useState([]);

  //Add box
  const [parentnew, setParentnew] = useState();
  const [newname, setNewname] = useState("");
  const [newsex, setNewsex] = useState("male");

  const [isadd, setIsadd] = useState(0);
  const [dimensions, setDimensions] = useState(null);

  const [height, width, yOffset, yClearance] = [80, 220, 200, 160];
  const callBackRef = useCallback((domNode) => {
    if (domNode) {
      setDimensions(domNode.getBoundingClientRect());
    }
  }, []);

  //ADD
  const Add = (input, name, sex) => {
    let found = searchTree(data[0], input.name);

    if (found.children != null) {
      found.children.push({
        parent: input.name,
        name: name,
        attributes: {
          sex: sex,
        },
        children: [],
      });
    } else if (found.children == null) {
      found.children = [
        {
          parent: input.name,
          name: name,
          attributes: {
            sex: sex,
          },
          children: [],
        },
      ];
    }

    axios
      .post(`${host}/update`, { query: id, data: data })
      .then((response) => {
        return response;
      })
      .then((response) => {
        if (response.data.status == 200) {
          let copy = [...data, found];

          setData(copy);
          setIsadd(0);
          setParentnew({});
          setNewsex("");

          alert("Add successfully");
        }
      });

    console.log("ADd", data);
  };

  //Delete

  const Delete = (input) => {
    let parent = searchTree(editdata[0], input.parent);

    console.log(parent);

    if (parent == null) {
      alert("This is root can't delete");
    } else {
      parent.children = parent.children.filter(
        (search) => search.name != input.name
      );

      axios
        .post(`${host}/update`, { query: id, data: editdata })
        .then((response) => {
          return response;
        })
        .then((response) => {
          if (response.data.status == 200) {
            let copy = [...data, parent];

            setData(copy);
            console.log(data);
            alert("Delete successfully");
          }
        });
    }
  };

  useEffect(() => {
    setData(Selecteduser.selected.familytree);
    editdata = Selecteduser.selected.familytree;
    id = Selecteduser.selected._id;
  }, [Selecteduser]);

  useEffect(() => {}, [data]);

  useEffect(() => {
    if (dimensions != undefined)
      setState({
        translate: {
          x: dimensions.width / 2,
          y: yOffset,
        },
      });
  }, [dimensions]);

  const Adddata = (data, status) => {
    setIsadd(status);
    setParentnew(data);
  };

  const Savenew = () => {
    Add(parentnew, newname, newsex);
  };

  const Handlenewname = (e) => {
    setNewname(e.target.value);
  };
  const Handlenewsex = (e) => {
    setNewsex(e.target.value);
  };

  return (
    <div>
      {isadd == 1 ? (
        <div
          style={{ padding: "5px" }}
          className="box flex col jus-center al-center"
        >
          <h3>ADD CHILD {parentnew.name}</h3>
          <input
            onChange={(e) => Handlenewname(e)}
            style={{ outlineStyle: "none", padding: "5px", fontSize: "16px" }}
            placeholder="Name"
          ></input>
          <div>
            <label for="sex">Choose a sex:</label>

            <select
              onChange={(e) => Handlenewsex(e)}
              style={{
                outlineStyle: "none",
                padding: "5px",
                fontSize: "16px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              name="sex"
              id="sex"
            >
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="none">none</option>
            </select>
          </div>

          <button
            onClick={() => Savenew()}
            style={{ width: "50px", height: "50px", marginTop: "20px" }}
          >
            SAVE
          </button>
        </div>
      ) : null}

      <div style={containerStyles} ref={callBackRef}>
        {data != undefined && data != null && data != "" ? (
          <Tree
            data={data}
            collapsible={false}
            translate={state.translate}
            scaleExtent={{ min: 1, max: 3 }}
            allowForeignObjects={true}
            pathFunc="elbow"
            orientation="vertical"
            nodeSvgShape={{ shape: "none" }}
            nodeSize={{ x: 250, y: yClearance }}
            renderCustomNodeElement={(rd3tProps) =>
              renderForeignObjectNode({
                ...rd3tProps,
                foreignObjectProps,
                Adddata,
                Delete,
              })
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default CenteredTree;
