document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const addButton = document.getElementById('addButton');
    const participantsList = document.getElementById('participantsList');
    const numberInput = document.getElementById('numberInput');
    const drawButton = document.getElementById('drawButton');
    const winnersList = document.getElementById('winnersList');
    const bgColorSelect = document.getElementById('bgColorSelect');

    // ローカルストレージから参加者リストを取得
    const getParticipants = () => JSON.parse(localStorage.getItem('participants')) || [];

    // 参加者リストを保存
    const saveParticipants = (participants) => localStorage.setItem('participants', JSON.stringify(participants));

    // 参加者リストを表示
    const renderParticipants = () => {
        participantsList.innerHTML = '';
        const participants = getParticipants();
        participants.forEach((participant, index) => {
            const li = document.createElement('li');
            li.textContent = participant;
            const removeButton = document.createElement('button');
            removeButton.textContent = '削除';
            removeButton.addEventListener('click', () => {
                removeParticipant(index);
            });
            li.appendChild(removeButton);
            participantsList.appendChild(li);
        });
    };

    // 参加者を追加
    const addParticipant = () => {
        const name = nameInput.value.trim();
        if (name) {
            const participants = getParticipants();
            participants.push(name);
            saveParticipants(participants);
            renderParticipants();
            nameInput.value = '';
        }
    };

    // 参加者を削除
    const removeParticipant = (index) => {
        const participants = getParticipants();
        participants.splice(index, 1);
        saveParticipants(participants);
        renderParticipants();
    };

    // 抽選を実行
    const drawWinners = () => {
        const participants = getParticipants();
        const numberOfWinners = parseInt(numberInput.value);
        if (numberOfWinners > 0 && numberOfWinners <= participants.length) {
            const shuffled = participants.sort(() => 0.5 - Math.random());
            const winners = shuffled.slice(0, numberOfWinners);
            winnersList.innerHTML = '';
            winners.forEach(winner => {
                const li = document.createElement('li');
                li.textContent = winner;
                winnersList.appendChild(li);
            });
        } else {
            alert('正しい人数を入力してください。');
        }
    };

    // 背景色の変更
    const changeBackgroundColor = (color) => {
        document.body.className = color;
        localStorage.setItem('bgColor', color);
    };

    // イベントリスナーを設定
    addButton.addEventListener('click', addParticipant);
    drawButton.addEventListener('click', drawWinners);
    bgColorSelect.addEventListener('change', () => {
        changeBackgroundColor(bgColorSelect.value);
    });

    // 初期状態を設定
    renderParticipants();

    // 背景色をローカルストレージから取得
    const savedBgColor = localStorage.getItem('bgColor') || 'white';
    document.body.className = savedBgColor;
    bgColorSelect.value = savedBgColor;
});
