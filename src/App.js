import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button, Input,Modal,Tabs} from 'antd';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleOfCreateTodo:false,
            createInputValue:'',
            todoList:["吃饭","睡觉"]
        }
    }
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

    callback=(key)=> {
        console.log(key);
    }

    handleDeleteTodoList = (target) =>{
        this.setState({
            todoList:this.deleteTodo(target)
        })
    }

    handleCreateInputValue = (e) =>{
        console.log(e.target.value);
        this.setState({createInputValue : e.target.value})
    }

    deleteTodo = (willBeDeletedTodo) =>{
        return this.state.todoList.filter((todo)=>{
            return todo !== willBeDeletedTodo
        })
    }


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
                                {this.state.todoList.map((todo)=>{
                                    return (
                                        <div>
                                            <li key={todo}>{todo}</li>
                                            <Button onClick={()=>{this.handleDeleteTodoList(todo)}}>删除</Button>
                                            <Button>编辑</Button>
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
            </React.Fragment>

        )
    }


}

export default App;
