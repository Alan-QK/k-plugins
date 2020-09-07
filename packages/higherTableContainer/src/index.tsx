import React, { useState, useRef, useEffect, CSSProperties } from 'react';

const wrapperStyle = (row): CSSProperties => ({
  position: 'relative',
  border: '1px solid #ddd',
  height: `calc(${row}em + 2em)`,
  padding: '0.7em',
  overflowX: 'hidden',
  overflowY: 'auto',
});

const basicItemStyle: CSSProperties = {
  display: 'inline-block',
  padding: '0px 0.7em',
  lineHeight: '20px',
  fontSize: '12px',
  color: '#999',
  border: '1px solid #d9d9d9',
};

const sItemStyle: CSSProperties = {
  ...basicItemStyle,
  marginRight: '5px',
  background: '#fafafa',
  marginBottom: '5px',
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  verticalAlign: 'top',
  whiteSpace: 'pre-wrap',
};

const inputStyle: CSSProperties = {
  border: 'none',
  outline: 'none',
  fontSize: '12px',
  lineHeight: '22px',
  verticalAlign: 'top',
  background: 'transparent',
  maxHeight: '5em',
  width: '-webkit-fill-available',
};

const placeholderStyle: CSSProperties = {
  position: 'absolute',
  color: 'rgba(176, 176, 176, 0.8)',
  fontWeight: 100,
};

// const errorStyle = {
//   color: 'rgb(255, 85, 0)',
//   borderColor: 'red',
// };

interface MuiltInputProps {
  value?;
  onChange?;
  row?: number;
  placeholder?;
  splitSpot?;
  childValid?;
}

const MuiltInput = ({
  value,
  onChange,
  row = 6,
  placeholder,
  splitSpot,
  childValid = () => true,
}: MuiltInputProps) => {
  const inputRef: any = useRef();
  const [words, setWords] = useState<Array<string>>([]);
  const [inputVal, setInputVal] = useState<string>();

  const [editInputValue, setEditInputValue] = useState('');
  const [editInputVisible, setEditInputVisible] = useState<{ [propname: number]: boolean }>({
    '-1': false,
  });

  useEffect(() => {
    if (value) {
      setWords(value);
    }
  }, [value]);

  function resetEditInputState(idx?) {
    setEditInputVisible({ [idx > -1 ? idx : -1]: false });
    setEditInputValue('');
  }

  const focusTarget = (e) => {
    const tarKey = e.target?.dataset?.key;
    if (tarKey === 'muilt-input-wrapper' || tarKey === 'muilt-input-placeholder') {
      inputRef?.current.focus();

      if (editInputVisible) {
        resetEditInputState();
      }
    }
  };

  function getSplitedVals(val) {
    if (!splitSpot) return [val];

    const regStr = new RegExp(`[${splitSpot}]`, 'g');
    const hasSplitSpot = regStr.test(val);
    if (!hasSplitSpot) return [val];

    const newVal = val.replace(regStr, ';').split(';');
    return newVal.map((i) => i.trim()).filter((i) => i);
  }

  function updateVal(type, val?, index?) {
    let nextVals = words?.slice();
    switch (type) {
      case 'new':
        // val 为新值
        const nextVal = val?.trim();
        if (nextVal && words?.indexOf(nextVal) === -1) {
          nextVals = Array.from(new Set([...nextVals, ...getSplitedVals(val)]));
        } else {
          return;
        }
        break;
      case 'delete':
        // val 为数组下标
        if (!nextVals.length) return;
        nextVals.splice(val > -1 ? val : nextVals.length - 1, 1);
        break;
      case 'edit':
        if (!val) {
          // val 为空等同删除操作
          nextVals.splice(index, 1);
        } else if (val !== words[index]) {
          const prevGroup = nextVals.slice(0, index);
          const afterGroup = nextVals.slice(index + 1, nextVals.length);
          nextVals = Array.from(new Set([...prevGroup, ...getSplitedVals(val), ...afterGroup]));
          resetEditInputState(index);
        } else {
          resetEditInputState(index);
          return;
        }
      default:
        // console.error('Some thing is Error.')
        break;
    }

    setWords(nextVals);
    onChange(nextVals);
    setInputVal('');
  }

  const handleEnterKey = (e, idx?) => {
    if (e.nativeEvent.keyCode === 13) {
      //e.nativeEvent获取原生的事件对像
      updateVal(idx > -1 ? 'edit' : 'new', e.target.value, idx);
    }
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.keyCode === 8 && !e.target.value && words?.length) {
      updateVal('delete');
    }
  };
  const blurInput = (e, idx?) => {
    updateVal(idx > -1 ? 'edit' : 'new', e.target.value, idx);
  };

  const toggleState = (idx) => {
    words && setEditInputValue(words[idx]);
    setEditInputVisible({ [idx]: true });
  };

  return (
    <div
      className="wrapper"
      data-key="muilt-input-wrapper"
      style={{ ...wrapperStyle(row) }}
      onClick={focusTarget}
      onFocus={focusTarget}
    >
      {!words?.length && !inputVal && (
        <span
          style={placeholderStyle}
          data-key="muilt-input-placeholder"
          onClick={focusTarget}
          onFocus={focusTarget}
        >
          {placeholder}
        </span>
      )}

      {words?.map((i, idx) => {
        if (editInputVisible[idx]) {
          return (
            <input
              key={i}
              style={{
                ...inputStyle,
                ...basicItemStyle,
                marginBottom: '5px',
                width: 'auto',
                marginRight: '5px',
              }}
              value={editInputValue}
              onChange={(e) => {
                setEditInputValue(e.target.value);
              }}
              onBlur={(e) => blurInput(e, idx)}
              onKeyPress={(e) => handleEnterKey(e, idx)}
            />
          );
        }
        return (
          <span
            key={i}
            className="s-item"
            style={{
              ...sItemStyle,
              borderColor: !childValid(i) ? 'red' : '#d9d9d9',
            }}
          >
            <span
              onDoubleClick={() => toggleState(idx)}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                whiteSpace: 'pre-wrap',
                width: 'calc(100% - 13px)',
                verticalAlign: 'top',
                color: !childValid(i) ? 'red' : '#999',
              }}
            >
              {/* {renderItem(i)} */}
              {i}
            </span>

            <span
              role="img"
              aria-label="close"
              onClick={() => updateVal('delete', idx)}
              className="anticon anticon-close ant-tag-close-icon"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="close"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
              </svg>
            </span>
          </span>
        );
      })}

      <input
        ref={inputRef}
        value={inputVal}
        style={inputStyle}
        onChange={(e) => {
          setInputVal(e.target.value);
        }}
        onBlur={blurInput}
        onKeyPress={handleEnterKey}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default MuiltInput;
