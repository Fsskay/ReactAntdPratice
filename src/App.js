import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Input, Modal, Tabs} from 'antd';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleOfCreateTodo: false,
            visibleOfEditTodo: false,
            createInputValue: '',
            todoList: ["吃饭", "睡觉"],

            willBeEditTodo: '',
            newTodoValue: ''

        }
    }

    callback = (key) => {
        console.log(key);
    }


    //创建按钮函数{
    showCreateTodoModal = () => {
        this.setState({
            visibleOfCreateTodo: true,
        });
    };
    handleCreateTodoModalDoOk = e => {
        console.log(e);
        this.setState({
            visibleOfCreateTodo: false,
        });
        let {createInputValue} = this.state
        this.state.todoList.push(createInputValue)
    };
    handleCreateTodoModalCancel = e => {
        console.log(e);
        this.setState({
            visibleOfCreateTodo: false,
        });
    };
    handleCreateInputValue = (e) => {
        console.log(e.target.value);
        this.setState({createInputValue: e.target.value})
    }
    //}创建按钮函数


    //编辑按钮函数{
    handleEditTodoModal = (todo) => {
        this.setState({
            willBeEditTodo: todo,
            visibleOfEditTodo: true,
        });

    };
    handleEditTodoModalDoOk = e => {
        let afterEditTodoList = this.editTodo(this.state.todoList, this.state.willBeEditTodo, this.state.newTodoValue)
        console.log(afterEditTodoList)
        console.log(this.state.todoList)
        this.setState({
            visibleOfEditTodo: false,
            todoList: afterEditTodoList,
        });

    };
    handleEditTodoModalCancel = e => {

        this.setState({
            visibleOfEditTodo: false,
        });
    };
    handleEditInputValue = (e) => {
        this.setState({
            newTodoValue: e.target.value
        })

    }
    editTodo = (array, editedTodo, newTodoValue) => {
        return array.map((item)=>{return item === editedTodo ? newTodoValue :item})
    }

    //}编辑按钮函数

    //删除按钮函数{
    handleDeleteTodoList = (willBeDeletedTodo) => {
        this.setState({
            todoList: this.deleteTodo(willBeDeletedTodo)
        })
    }
    deleteTodo = (willBeDeletedTodo) => {
        return (this.state.todoList.filter((todo) => {
            return (todo !== willBeDeletedTodo)
        }))
    }

    //}删除按钮函数

    render() {
        const {Search} = Input;
        const {TabPane} = Tabs;
        return (
            <React.Fragment>
                <div className="App">
                    <Button type="primary" onClick={this.showCreateTodoModal}>增加todo</Button>
                    <Search
                        placeholder="搜索todo"
                        onSearch={value => console.log(value)}
                        style={{width: 200}}
                    />

                    <Tabs defaultActiveKey="1" onChange={this.callback}>
                        <TabPane tab="未完成" key="1">
                            <ul>
                                {this.state.todoList.map((todo) => {
                                    return (
                                        <div>
                                            <li key={todo}>{todo}</li>
                                            <Button onClick={
                                                () => {
                                                    this.handleDeleteTodoList(todo)
                                                }
                                            }>删除</Button>
                                            <Button onClick={
                                                () => {
                                                    this.handleEditTodoModal(todo)
                                                }
                                            }>编辑</Button>
                                        </div>
                                    )
                                })}
                            </ul>
                        </TabPane>
                        <TabPane tab="已完成" key="2">

                        </TabPane>

                    </Tabs>


                </div>


                <Modal
                    title="增加todo事项"
                    visible={this.state.visibleOfCreateTodo}
                    onOk={this.handleCreateTodoModalDoOk}
                    onCancel={this.handleCreateTodoModalCancel}
                >
                    <Input placeholder="请输入要增加的todo事项" onChange={this.handleCreateInputValue}/>
                </Modal>
                <Modal
                    title="编辑todo事项"
                    visible={this.state.visibleOfEditTodo}
                    onOk={this.handleEditTodoModalDoOk}
                    onCancel={this.handleEditTodoModalCancel}
                >
                    <Input placeholder="123" onChange={this.handleEditInputValue}/>
                </Modal>


            </React.Fragment>

        )
    }


}

export default App;
