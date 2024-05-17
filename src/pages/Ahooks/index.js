import React, { useState, useRef, useEffect } from 'react';

export default () => {
  const countRef = useRef({ count: 0 });
  const [count, setCount] = useState(0);

  return (
    <div>
      <span>{count}</span>
      <p>
        <button
          type="button"
          onClick={() => {
            Promise.resolve()
              .then(() => {
                setCount(prevCount => prevCount + 1);
                countRef.current.count = count + 1;
              })
              .then(() => {
                console.log(countRef.current.count);
              });
          }}
        >
          count
        </button>
      </p>
    </div>
  );
};

const useTitle = title => {
  useEffect(() => {
    document.title = title;
  }, []);
};
