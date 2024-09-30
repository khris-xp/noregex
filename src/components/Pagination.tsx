import { Fragment, useEffect, useState } from "react";

interface Prop {
  page_amount: number;
  setPage: (data: number) => void;
}
export default function Pagination({ page_amount, setPage }: Prop) {
  const pages = Array.from(
    { length: page_amount },
    (value, index) => index + 1,
  ); // [1, 2, 3, 4, 5, ..., page_amount]
  const [showRange, setShowRange] = useState<number[]>(pages);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [showSkip, setShowSkip] = useState<boolean>(pages.length > 9);

  useEffect(() => {
    setPage(selectedPage);
    // alert(selectedPage);
  }, [selectedPage]);

  interface Prop {
    number: number;
  }
  function ClickableNumber({ number }: Prop) {
    return (
      <button
        onClick={() => setSelectedPage(number)}
        className="float-left flex justify-center items-center w-10 h-10 mx-1 rounded-xl border-2 bg-white hover:bg-[#283584] text-[#333333] hover:text-white border-[#F1F1F1] hover:border-[#283584]"
      >
        {number}
      </button>
    );
  }
  return (
    <div className="inline-block h-full w-fit max-h-12 min-h-4">
      {showSkip && (
        <Fragment>
          <button
            onClick={() => {
              if (showRange[0] > 3) {
                setShowRange([
                  showRange[0] - 3,
                  showRange[0] - 2,
                  showRange[0] - 1,
                  ...showRange,
                ]);
              } else {
                setShowRange(pages);
              }
            }}
            className="float-left flex justify-center items-center w-10 h-10 mx-1 rounded-xl border-2 bg-white hover:bg-[#283584] text-[#333333] hover:text-white border-[#F1F1F1] hover:border-[#283584]"
          >
            {"<<"}
          </button>
          <button
            onClick={() => {
              if (showRange[0] > 1)
                setShowRange([showRange[0] - 1, ...showRange]);
            }}
            className="float-left flex justify-center items-center w-10 h-10 mx-1 rounded-xl border-2 bg-white hover:bg-[#283584] text-[#333333] hover:text-white border-[#F1F1F1] hover:border-[#283584]"
          >
            {"<"}
          </button>
        </Fragment>
      )}
      {showSkip
        ? showRange.map((number, index) => {
            const isEllipsisStart =
              showRange.length === 5 && number === showRange[0];
            const isEllipsisEnd =
              (showRange.length !== 5 &&
                number === showRange[showRange.length - 2]) ||
              (showRange.length === 5 &&
                number === showRange[showRange.length - 2]);
            const isMiddleNumber = number <= showRange[2];
            const isLastNumber = number === showRange[showRange.length - 1];

            if (isEllipsisStart || isEllipsisEnd) {
              return (
                <p
                  key={index}
                  className="float-left flex justify-center items-center w-10 h-10 mx-1 rounded-xl border-2 bg-white text-[#333333] border-[#F1F1F1]"
                >
                  ...
                </p>
              );
            }

            if (isMiddleNumber || isLastNumber) {
              return <ClickableNumber key={index} number={number} />;
            }

            return null;
          })
        : pages.map((number, index) => (
            <ClickableNumber key={index} number={number} />
          ))}
      {showSkip && (
        <Fragment>
          <button
            onClick={() => {
              if (showRange.length > 5) setShowRange(showRange.slice(1));
            }}
            className="float-left flex justify-center items-center w-10 h-10 mx-1 rounded-xl border-2 bg-white hover:bg-[#283584] text-[#333333] hover:text-white border-[#F1F1F1] hover:border-[#283584]"
          >
            {">"}
          </button>
          <button
            onClick={() => {
              if (showRange.length > 8) {
                setShowRange(showRange.slice(3));
              } else {
                setShowRange(showRange.slice(-5));
              }
            }}
            className="float-left flex justify-center items-center w-10 h-10 mx-1 rounded-xl border-2 bg-white hover:bg-[#283584] text-[#333333] hover:text-white border-[#F1F1F1] hover:border-[#283584]"
          >
            {">>"}
          </button>
        </Fragment>
      )}
    </div>
  );
}
