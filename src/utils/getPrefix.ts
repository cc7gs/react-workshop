const getPrefixCls= (suffixCls?:string)=>suffixCls?`ant-${suffixCls}`:'ant';

export default getPrefixCls;