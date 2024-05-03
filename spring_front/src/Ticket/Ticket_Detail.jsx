import Ad from "../components/Ad";
import Article from "../components/Article";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Ticket_Detail = () => {

    return <div className="Ticket_Detail">
        <Header />
        <Article title="티켓 예약 정보" body="티켓 예약 정보" />
        <h1>티켓 예약 정보</h1>

        {/* <form onSubmit={handleUpdateProfile}> */}
        <form>
            <h3>티켓 정보 (버스, if문 : 버스 예약 정보가 있을 경우)</h3>
            <div className="form-group">
                <label>티켓 이름:</label>
                티켓 이름 DB 값
                {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
            </div>
            <div className="form-group">
                {/* <label>기존 비밀번호:</label> */}
                <label>비밀번호:</label>
                비밀번호 DB 값
                {/* <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} /> */}
            </div>
            {/* <div className="form-group">
          <label>새 비밀번호:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div> */}
            <div className="form-group">
                <label>핸드폰번호:</label>
                핸드폰번호 DB 값
                {/* <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
            </div>
            <div className="form-group">
                <label>주소:</label>
                주소 DB 값
                {/* <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /> */}
            </div>
            {/* <button type="submit" disabled={!isChanged()}>수정하기</button> */}
            {/* {message && <p>{message}</p>} */}

        </form>

        <hr />

        {/* <form onSubmit={handleUpdateProfile}> */}
        <form>
            <h3>티켓 정보 (기차, if문 : 기차 예약 정보가 있을 경우)</h3>
            <div className="form-group">
                <label>티켓 이름:</label>
                티켓 이름 DB 값
                {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
            </div>
            <div className="form-group">
                {/* <label>기존 비밀번호:</label> */}
                <label>비밀번호:</label>
                비밀번호 DB 값
                {/* <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} /> */}
            </div>
            {/* <div className="form-group">
          <label>새 비밀번호:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div> */}
            <div className="form-group">
                <label>핸드폰번호:</label>
                핸드폰번호 DB 값
                {/* <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
            </div>
            <div className="form-group">
                <label>주소:</label>
                주소 DB 값
                {/* <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /> */}
            </div>
            {/* <button type="submit" disabled={!isChanged()}>수정하기</button> */}
            {/* {message && <p>{message}</p>} */}

        </form>

        <hr />

        {/* <form onSubmit={handleUpdateProfile}> */}
        <form>
            <h3>티켓 정보 (공항, if문 : 공항 예약 정보가 있을 경우)</h3>
            <div className="form-group">
                <label>티켓 이름:</label>
                티켓 이름 DB 값
                {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
            </div>
            <div className="form-group">
                {/* <label>기존 비밀번호:</label> */}
                <label>비밀번호:</label>
                비밀번호 DB 값
                {/* <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} /> */}
            </div>
            {/* <div className="form-group">
          <label>새 비밀번호:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div> */}
            <div className="form-group">
                <label>핸드폰번호:</label>
                핸드폰번호 DB 값
                {/* <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
            </div>
            <div className="form-group">
                <label>주소:</label>
                주소 DB 값
                {/* <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} /> */}
            </div>
            {/* <button type="submit" disabled={!isChanged()}>수정하기</button> */}
            {/* {message && <p>{message}</p>} */}

        </form>

        <hr />

        {/* <form onSubmit={handleUpdateProfile}> */}
        <form>

            <div className="form-group">

                <h3>티켓 정보가 없습니다 (else : 아무 예약 정보가 없을 경우)</h3>

            </div>



        </form>

        <Ad />

        <Footer />

    </div>

}

export default Ticket_Detail;