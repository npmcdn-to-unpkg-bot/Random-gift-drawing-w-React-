"use strict";
var TodoBox = React.createClass({
	displayName: "TodoBox",

	getInitialState: function getInitialState() {
		return {
			data: [{ "id": "00001", "task": "Gift1" }, { "id": "00002", "task": "Gift2" }, { "id": "00003", "task": "Gift3" }]

		};
	},
	generateId: function generateId() {
		return Math.floor(Math.random() * 90000) + 10000;
	},
	handleNodeRemoval: function handleNodeRemoval(nodeId) {
		var data = this.state.data;
		data = data.filter(function (el) {
			return el.id !== nodeId;
		});
		this.setState({ data: data });
		return;
	},
	handleSubmit: function handleSubmit(task) {
		var data = this.state.data;
		var id = this.generateId().toString();
		data = data.concat([{ id: id, task: task }]);
		this.setState({ data: data });
	},
	render: function render() {

		var requireNumber = this.state.data.length;
		return React.createElement(
			"div",
			{ className: "ui two column stackable grid" },
			React.createElement(
				"div",
				{ className: "column" },
				React.createElement(
					"h2",
					{ className: "ui header huge dividing" },
					React.createElement(
						"div",
						{ className: "content" },
						React.createElement("i", { className: "gift icon" }),
						"Gifts"
					)
				),
				React.createElement(TodoList, { data: this.state.data, removeNode: this.handleNodeRemoval }),
				React.createElement(TodoForm, { onTaskSubmit: this.handleSubmit })
			),
			React.createElement("div", { className: "ui vertical divider" }),
			React.createElement(
				"div",
				{ className: "column" },
				React.createElement(DisplayNum, { require: requireNumber, data: this.state.data })
			)
		);
	}
});

var TodoList = React.createClass({
	displayName: "TodoList",

	removeNode: function removeNode(nodeId) {
		this.props.removeNode(nodeId);
		return;
	},
	render: function render() {
		var listNodes = this.props.data.map(function (listItem) {
			return React.createElement(TodoItem, { key: listItem.id, nodeId: listItem.id, task: listItem.task, removeNode: this.removeNode });
		}, this);
		return React.createElement(
			"div",
			{ className: "ui middle aligned divided list" },
			listNodes
		);
	}
});

var TodoItem = React.createClass({
	displayName: "TodoItem",

	removeNode: function removeNode(e) {
		e.preventDefault();
		this.props.removeNode(this.props.nodeId);
		return;
	},
	updateClass: function updateClass() {},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "ui item" },
			React.createElement(
				"div",
				{ role: "group", className: "right floated content" },
				React.createElement(
					"button",
					{ type: "button", className: "ui icon button ", onClick: this.removeNode },
					React.createElement("i", { className: "remove icon" })
				)
			),
			React.createElement(
				"div",
				{ className: "ui item" },
				" ",
				this.props.task,
				" "
			)
		);
	}
});

var TodoForm = React.createClass({
	displayName: "TodoForm",

	doSubmit: function doSubmit(e) {
		e.preventDefault();
		var task = React.findDOMNode(this.refs.task).value.trim();
		if (!task) {
			return;
		}
		this.props.onTaskSubmit(task);
		React.findDOMNode(this.refs.task).value = '';
		return;
	},
	render: function render() {
		return React.createElement(
			"form",
			{ onSubmit: this.doSubmit, className: "ui item container" },
			React.createElement(
				"div",
				{ htmlFor: "task", className: "ui header dividing" },
				"Add New Gift"
			),
			React.createElement(
				"div",
				{ className: "ui small icon input" },
				React.createElement("input", { type: "text", id: "task", ref: "task", className: "", placeholder: "New Gifts" }),
				React.createElement("i", { className: "plus icon" })
			)
		);
	}
});

var DisplayNum = React.createClass({
	displayName: "DisplayNum",

	getInitialState: function getInitialState() {
		return {
			maxNumber: 10,
			requireNumber: 4 };
	},
	handleMaxChange: function handleMaxChange(event) {
		var newNumber = event.target.value;
		this.setState({ maxNumber: newNumber });
	},
	render: function render() {
		var requireNumber = this.props.require;
		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "ui small icon input" },
				React.createElement("input", { type: "text", onBlur: this.handleMaxChange, placeholder: "input number, default 10" }),
				React.createElement("i", { className: "users icon" })
			),
			React.createElement(
				"p",
				null,
				"number of people: ",
				this.state.maxNumber,
				" "
			),
			React.createElement(RandomNum, { maxNumber: this.state.maxNumber, requireNumber: requireNumber, data: this.props.data })
		);
	}
});

var RandomNum = React.createClass({
	displayName: "RandomNum",

	getInitialState: function getInitialState() {
		return {
			current: 0,
			numberR: doRand(this.props.maxNumber),
			result: [],
			startClass: "",
			btnClass: "invisable "
		};
	},
	drawAgain: function drawAgain() {
		if (this.state.current >= this.props.maxNumber - 1) {
			alert('no more people to draw!');
		} else {
			this.setState({ current: this.state.current + 1 });
		}
	},
	drawNext: function drawNext() {
		if (this.state.result.length >= this.props.requireNumber) {
			alert('End of drawing!');
		} else {
			var temp = this.state.result;
			temp.push(this.state.numberR[this.state.current]);

			this.setState({
				current: this.state.current + 1,
				result: temp
			});
		}
	},
	drawReset: function drawReset() {
		this.setState({
			current: 0,
			numberR: doRand(this.props.maxNumber),
			result: [] });
	},
	drawStart: function drawStart() {

		var temp1 = this.state.startClass;
		var temp2 = this.state.btnClass;
		this.setState({
			numberR: doRand(this.props.maxNumber),
			startClass: temp2,
			btnClass: temp1
		});
	},
	render: function render() {
		var dataList = this.props.data;
		var resultList = this.state.result;
		var dataPrintList = dataList.map(function (dataList, i) {
			return React.createElement(
				"div",
				{ className: "ui two column grid item" },
				React.createElement(
					"div",
					{ className: "ui item column" },
					React.createElement(
						"div",
						{ className: "content" },
						" ",
						dataList.task,
						" "
					)
				),
				React.createElement(
					"div",
					{ className: "ui item column" },
					React.createElement(
						"div",
						{ className: "float right content" },
						" ",
						resultList[i],
						" "
					)
				)
			);
		});
		return React.createElement(
			"div",
			{ className: "ui item" },
			React.createElement(
				"div",
				{ className: this.state.startClass },
				React.createElement(
					"button",
					{ type: "button", className: "ui icon button", onClick: this.drawStart },
					"Start"
				)
			),
			React.createElement(
				"div",
				{ className: this.state.btnClass },
				React.createElement(
					"h2",
					{ className: "ui header huge" },
					"Winner: "
				),
				React.createElement(
					"h2",
					{ className: "ui header huge dividing" },
					" ",
					this.state.numberR[this.state.current],
					" "
				),
				React.createElement(
					"button",
					{ type: "button", className: "ui icon button", onClick: this.drawAgain },
					"Again"
				),
				React.createElement(
					"button",
					{ type: "button", className: "ui icon button", onClick: this.drawNext },
					"Next"
				),
				React.createElement(
					"button",
					{ type: "button", className: "ui icon button", onClick: this.drawReset },
					"Reset"
				)
			),
			React.createElement(
				"h2",
				{ className: "ui header" },
				" Results "
			),
			React.createElement(
				"div",
				{ className: "ui middle aligned divided list" },
				dataPrintList
			)
		);
	}
});

ReactDOM.render(React.createElement(TodoBox, null), document.getElementById('todo'));