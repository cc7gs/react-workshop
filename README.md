本仓库主要是学习 react patterns 搭建的个人仓库，下面是我的一些模式总结

# 基础使用（callback）
```js
import React, { useState } from 'react'
import { Switch } from '../component'

interface IProps {
    onToggle: (args: any) => void
}

type IState = Readonly<{
    on: boolean;
}>;

function Usage() {
    const handleToggle = (args: any) => {
        console.log(args, 'click');
    }
    return (
        <Toggle onToggle={handleToggle} />
    )
}
Usage.title = 'Build Toggle'

export { Usage as default }
```

`Toggle 组件 class component`

```js

/**
 * 2. 使用 class Component
 */
class Toggle extends React.Component<IProps, IState>{
    state = {
        on: false
    }
    handleClick = () => {
        this.setState(({ on }) => ({ on: !on }), () => {
            //callback
            this.props.onToggle(this.state.on);
        })
    }
    render() {
        const { on } = this.state
        return (
            <Switch on={on} onClick={this.handleClick} />
        )
    }
}

```

`Toggle 组件 hooks版`

```js
/**
 * 1. 使用函数组件(hooks)
 */

const Toggle:React.FC<IProps>=(props)=>{
    const [on,setOn]=useState(false);
    const handleClick=()=>{
        setOn(!on);
        props.onToggle(!on);
    }
    return(
        <Switch on={on} onClick={handleClick}/>
    )
}

```

# Function as Child Component
是指父组件接收一个函数以实现复用 代码如下：
```js
import { Parent } from './components';
function example () {
return (
<Parent>
{ param => <div> {param}</div>}
</Parent>
)
}
```

```js
import React,{Component} from 'react'
class Parent extends Component{
    render(){
        <div> {this.props.children (this.state.username))</div>
    }
}

```
这种方式的特点在于 Parent 组件往往拥有一些内部状态或者需要做一些复杂且共享的计算，这些数据需要对外暴露以实现复用。通过传递函数参数的方式来实现数据复用。

# 复合组件(Compound component)
复合组件设计模式一般应用在一些共享组件上。如 select 和 option , Tab 和TabItem 等，通过复合组件，使用者只需要传递子组件，子组件所需要的 props 在父组件通过`React.Children.map`和`React.cloneElement`进行props传递封装，因此引用子组件的时候就没必要传递所有 props 了。下面引用项目`02.tsx`实例说明:

**使用处**
```jsx
function Usage() {
    const handleToggle = (args: any) => {
        console.log(args, 'click');
    }
    return (
        <Toggle onToggle={handleToggle}>
            <Toggle.On>The button is on</Toggle.On>
            <Toggle.Button />
            <Toggle.Off>The button is off</Toggle.Off>
        </Toggle>
    )
}
```

`Toggle组件`

```js
interface IProps {
    onToggle: (args: any) => void;
}

class Toggle extends React.Component<IProps>{
    static On: React.FC<any> = ({ on, children }) => <>{on ? children : null}</>
    static Off: React.FC<any> = ({ on, children }) => <>{on ? null : children}</>
    static Button: React.FC<any> = ({ on, toggle, ...props }) => (
        <Switch on={on} onClick={toggle} {...props} />
    )
    state = {
        on: false,
    }

    toggle = () => {
        this.setState({ on: !this.state.on }, () => {
            this.props.onToggle(this.state.on);
        })
    }
    render() {
       return React.Children.map(this.props.children,child=>(
           React.cloneElement(child as any,{
               on:this.state.on,
               toggle:this.toggle
           })
       ))
    }
}
```

## 进一步讨论

到目前为止,我们已经熟知复合模式都用处,现在我们对该问题进行进一步深入讨论，如果此时我们调用处的多层组件嵌套，像下面实例:
```js
 <Toggle onToggle={onToggle}>
      <div className="xx"><Toggle.On>The button is on</Toggle.On></div>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
</Toggle>
```
做组件props透传的或许会想到`context`,没错,利用数据状态管理可以很好解决组件层级管理数据共享的使用

`创建Togglecontext`

```js
const defaultValue = {
  on: false,
  toggle: () => { }
}
const ToggleContext = React.createContext(defaultValue);
```
`Toggle 组件使用`
```js
//...
  static On: React.FC<any> = ({ children }) => {
    const { on } = useContext(ToggleContext);
    return (on ? children : null)
  }
  static Off: React.FC<any> = ({ children }) => {
    const { on } = useContext(ToggleContext);
    return (on ? null : children)
  }
  static Button: React.FC<any> = (props) => {
    const { on, toggle } = useContext(ToggleContext)
    return (
      <Switch on={on} onClick={toggle} {...props} />
    )
  }
  static contextType = ToggleContext
    // ...省略状态和方法
  render(){
    return (
      <ToggleContext.Provider value={{ on, toggle: this.toggle }}>
        {this.props.children}
      </ToggleContext.Provider>
    )
   }
```
# render Props
在调用组件时，引入一个函数类型的props这个props 定义了组件的渲染方式。最终实现代码复用。

# 高阶组件(HOC)

# context
# provider