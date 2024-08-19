import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./Quotes.module.css";
import { useGetQuotesQuery } from "./quotesApiSlice";
const options = [5, 10, 20, 30];
export const Quotes = () => {
    const [numberOfQuotes, setNumberOfQuotes] = useState(10);
    // Using a query hook automatically fetches data and returns query values
    const { data, isError, isLoading, isSuccess } = useGetQuotesQuery(numberOfQuotes);
    if (isError) {
        return (_jsx("div", { children: _jsx("h1", { children: "There was an error!!!" }) }));
    }
    if (isLoading) {
        return (_jsx("div", { children: _jsx("h1", { children: "Loading..." }) }));
    }
    if (isSuccess) {
        return (_jsxs("div", { className: styles.container, children: [_jsx("h3", { children: "Select the Quantity of Quotes to Fetch:" }), _jsx("select", { className: styles.select, value: numberOfQuotes, onChange: e => {
                        setNumberOfQuotes(Number(e.target.value));
                    }, children: options.map(option => (_jsx("option", { value: option, children: option }, option))) }), data.quotes.map(({ author, quote, id }) => (_jsxs("blockquote", { children: ["\u201C", quote, "\u201D", _jsx("footer", { children: _jsx("cite", { children: author }) })] }, id)))] }));
    }
    return null;
};
