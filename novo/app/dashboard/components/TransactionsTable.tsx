import React from 'react';
import { Lock, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

// Placeholder data for transactions
const transactions = [
  { id: 1, name: 'Grand Rapids', amount: '+ 6,320.53', date: 'Wed 1:00 pm', account: 'Visa 1234', logoType: 'visa', avatarColor: 'bg-yellow-500' },
  { id: 2, name: 'Bell Gardens', amount: '+ 6,471.39', date: 'Wed 1:00 pm', account: 'Google Pay 1234', logoType: 'google', avatarColor: 'bg-pink-500' },
  { id: 3, name: 'Broomfield', amount: '- 2,223.9', date: 'Wed 7:20 pm', account: 'PayPal 1234', logoType: 'paypal', avatarColor: 'bg-blue-400' },
  { id: 4, name: 'Yakima', amount: '+ 7,344.50', date: 'Wed 1:00 pm', account: 'Maestro 1234', logoType: 'maestro', avatarColor: 'bg-green-500' },
  { id: 5, name: 'Springfield', amount: '- 6,157.14', date: 'Wed 7:20 pm', account: 'Apple Pay 1234', logoType: 'apple', avatarColor: 'bg-purple-500' },
  { id: 6, name: 'Alexandria', amount: '- 6,780.52', date: 'Wed 1:00 pm', account: 'Mastercard 1234', logoType: 'mastercard', avatarColor: 'bg-orange-500' },
  { id: 7, name: 'Kalamazoo', amount: '- 2,263.72', date: 'Wed 7:20 pm', account: 'Visa 1234', logoType: 'visa', avatarColor: 'bg-teal-500' },
];

// Simple placeholder for logos
const PaymentLogo = ({ type }: { type: string }) => {
  // In a real app, use actual SVGs or images
  const logoText = type.charAt(0).toUpperCase(); // Just use the first letter
  let bgColor = 'bg-gray-600';
  if (type === 'visa') bgColor = 'bg-blue-700';
  if (type === 'google') bgColor = 'bg-red-600';
  if (type === 'paypal') bgColor = 'bg-blue-500';
  if (type === 'maestro' || type === 'mastercard') bgColor = 'bg-orange-600';
  if (type === 'apple') bgColor = 'bg-gray-400';
  
  return (
    <div className={`w-8 h-5 ${bgColor} rounded-sm flex items-center justify-center text-white text-[10px] font-bold mr-2`}>
      {type === 'google' ? 'G' : type === 'paypal' ? 'P' : type.toUpperCase().substring(0,4)}
    </div>
  );
};

export default function TransactionsTable() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      {/* Privacy Banner */}
      <div className="bg-gray-700/50 p-4 flex items-center space-x-3 border-b border-gray-700">
        <Lock size={16} className="text-blue-500" />
        <p className="text-sm text-gray-300 flex-1">
          We protect your personal information. <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
        </p>
        <button className="text-gray-400 hover:text-white">
          <Plus size={18} />
        </button>
      </div>

      {/* Table Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Transactions</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-400">
            <thead className="text-xs text-gray-500 uppercase border-b border-gray-700">
              <tr>
                <th scope="col" className="py-3 pr-3">Name</th>
                <th scope="col" className="py-3 px-3">Amount</th>
                <th scope="col" className="py-3 px-3">Date</th>
                <th scope="col" className="py-3 pl-3">Account</th>
                <th scope="col" className="py-3 pl-3"></th> {/* For chevron */}
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-4 pr-3 flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full ${transaction.avatarColor} flex-shrink-0`}></div> {/* Avatar Placeholder */}
                    <span className="font-medium text-white whitespace-nowrap">{transaction.name}</span>
                  </td>
                  <td className={`py-4 px-3 font-medium whitespace-nowrap ${transaction.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {transaction.amount}
                  </td>
                  <td className="py-4 px-3 whitespace-nowrap">{transaction.date}</td>
                  <td className="py-4 pl-3 flex items-center">
                    <PaymentLogo type={transaction.logoType} />
                    <div>
                      <span className="text-white font-medium">{transaction.account.split(' ')[0]} {transaction.account.split(' ')[1]}</span>
                      <span className="block text-xs text-gray-500">Expire 24/2032</span>
                    </div>
                  </td>
                   <td className="py-4 pl-3 text-right">
                      <ChevronRight size={18} className="text-gray-500" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="p-4 flex justify-between items-center text-sm text-gray-400 border-t border-gray-700">
        <button className="flex items-center space-x-1 hover:text-white disabled:opacity-50" disabled>
          <ChevronLeft size={16} />
          <span>Prev</span>
        </button>
        <span>Page 1 to 8</span>
        <button className="flex items-center space-x-1 hover:text-white">
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
} 