import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./Counter.module.css";
import { decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd, selectCount, selectStatus, } from "./counterSlice";
export const Counter = () => {
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCount);
    const status = useAppSelector(selectStatus);
    const [incrementAmount, setIncrementAmount] = useState("2");
    const incrementValue = Number(incrementAmount) || 0;
    return (_jsxs("div", { children: [_jsxs("div", { className: styles.row, children: [_jsx("button", { className: styles.button, "aria-label": "Decrement value", onClick: () => dispatch(decrement()), children: "-" }), _jsx("span", { "aria-label": "Count", className: styles.value, children: count }), _jsx("button", { className: styles.button, "aria-label": "Increment value", onClick: () => dispatch(increment()), children: "+" })] }), _jsxs("div", { className: styles.row, children: [_jsx("input", { className: styles.textbox, "aria-label": "Set increment amount", value: incrementAmount, type: "number", onChange: e => {
                            setIncrementAmount(e.target.value);
                        } }), _jsx("button", { className: styles.button, onClick: () => dispatch(incrementByAmount(incrementValue)), children: "Add Amount" }), _jsx("button", { className: styles.asyncButton, disabled: status !== "idle", onClick: () => dispatch(incrementAsync(incrementValue)), children: "Add Async" }), _jsx("button", { className: styles.button, onClick: () => {
                            dispatch(incrementIfOdd(incrementValue));
                        }, children: "Add If Odd" })] })] }));
};
