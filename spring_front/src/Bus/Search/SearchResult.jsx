// const SearchResult = ({detail,index,busclass}) =>{

//     if(busclass ==='2'){
//   <tr key={index}>
//                                     <td>{detail.busClass}</td>
//                                     <td>{detail.departureTime}</td>
//                                     <td>{Math.floor(detail.wasteTime / 60)}시간 {detail.wasteTime % 60}분</td>
//                                     <td>{detail.fare.toLocaleString()}원</td>
//                                     <td>
//                                         <button className="button" onClick={seatSelect}>좌석 선택</button>
//                                         <input
//                                             type="text"
//                                             id="seatResult"
//                                             value={selectedSeats}
//                                             onChange={handleSeatResultChange}
//                                         />
//                                     </td>
//                                     <td><button className="button" onClick={payment}>결제</button></td>
//                                     <td><button className="button" onClick={() => handleItemClick(searchURLObject(location.pathname), detail)}>테스트 버튼</button></td>
//                                 </tr>
//                                 }



// }

// export default SearchResult;