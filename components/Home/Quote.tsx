'use client';

import { useTheme } from 'next-themes';

const Quote: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="bg-purple-100/50 dark:bg-gray-800/50 h-96">
      <div className="flex flex-col justify-center items-center h-full w-11/12 md:w-2/3 m-auto">
        <span
          className="bg-gray-600 dark:bg-gray-700 
        border-2 border-blue-600 rounded-full text-gray-100 text-base text-center px-6 py-2 md:text-2xl md:px-32 md:py-5"
        >
          קוד פתוח הוא בסיס לקהילה שעובדת יחד, חולקת ידע ומשתפת פעולה כדי ליצור
          משהו מדהים
        </span>
        <br></br>
        <span className="text-sm text-center mt-2 md:mt-8 md:text-xl md:w-1/2 md:mr-auto dark:text-#F8FAFC">
          לינוס טורוולדס, מייסד לינוקס
        </span>
      </div>
    </div>
  );
};

export default Quote;
