import React, { useCallback } from 'react';
import './detailOption.scss';

function DetailOption({ name, price, optionMap, setOptionMap }) {
  const handleAmountChange = useCallback(
    (optionValue) => (event) => {
      const selectedCount = parseInt(event.target.value);
      setOptionMap((prevOptionMap) => ({
        ...prevOptionMap,
        [optionValue]: {
          ...prevOptionMap[optionValue],
          count: selectedCount,
          totalPrice: selectedCount * prevOptionMap[optionValue].price,
        },
      }));
    },
    []
  );

  const handleRemoveOption = useCallback((optionValue) => {
    setOptionMap((prevOptionMap) => {
      const updatedOptionMap = { ...prevOptionMap };
      delete updatedOptionMap[optionValue];
      return updatedOptionMap;
    });
  }, []);

  const handleOnChange = useCallback((e) => {
    const value = e.target.value;
    if (value !== '') {
      let optionPrice = 0;
      if (value === 'S') {
        optionPrice = 0;
      } else if (value === 'M') {
        optionPrice = 10000;
      } else if (value === 'L') {
        optionPrice = 20000;
      } else if (value === 'XL') {
        optionPrice = 30000;
      }
      optionPrice += price;
      setOptionMap((prevOptionMap) => {
        const count = (prevOptionMap[value]?.count ?? 0) + 1;
        return {
          ...prevOptionMap,
          [value]: {
            value,
            count,
            price: optionPrice,
            totalPrice: count * optionPrice,
          },
        };
      });
    }
  }, []);

  const totalCount = Object.values(optionMap).reduce(
    (sum, option) => sum + option.count,
    0
  );

  const totalPrice = Object.values(optionMap).reduce(
    (sum, option) => sum + option.totalPrice,
    0
  );

  return (
    <div id="item-option">
      <strong className="delivery title-t">옵션 선택</strong>
      <select id="user-option" onChange={handleOnChange}>
        <option value="">사이즈를 선택해주세요.</option>
        <option value="S">S(+0원)</option>
        <option value="M">M(+10,000원)</option>
        <option value="L">L(+20,000원)</option>
        <option value="XL">XL(+30,000원)</option>
      </select>
      <div id="optionContainer">
        {Object.entries(optionMap).map(([optionValue, option]) => (
          <div id="selectBox" key={optionValue}>
            <div className="optionTemplate">
              <span className="optionItem name">{name}</span>
              <div className="optionItem value">{optionValue}</div>
              <div id="amountBox">
                <select id="amount" onChange={handleAmountChange(optionValue)}>
                  <option value="" disabled>
                    수량
                  </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <span className="money3">
                  {option.totalPrice.toLocaleString()}
                </span>
                <button
                  id="removeBtn"
                  onClick={() => handleRemoveOption(optionValue)}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="moneyBox">
        <div className="money title-b">
          <strong class="totalPrice">총 결제금액</strong>
        </div>
        <strong class="money">{totalPrice.toLocaleString()}원</strong>
      </div>
    </div>
  );
}

export default DetailOption;
