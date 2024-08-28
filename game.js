let CELLSIZE = 16*3;
let GameDimR = 8;
let GameDimC = 12;
const SOUNDVOLUME = 0.15;

const SPECS = {
    mobgenerator:{
        specs : (level,wave)=>{
            return {
                wavebuffer : 2,
                mobsCap : 13*level,
                wavecap : 13,
                timer : 4.4 - (level * 0.2),
                velocity : 0.1,
                mob:{
                    speed : 1 + level*2,
                    life :  1 + level*2,
                    skill : [],
                }, 
            }
        }
    },
    tower:[
        {n :'life', start : 10 , max : 200, increment : 10 , costformula : '1'},
        {n :'speed', start : 1 , max : 20, increment : 1 , costformula : '10 + value * 10'},
        {n :'range', start : 100 , max : 900, increment : 50 , costformula : '10'},
        {n :'power', start : 1 , max : 200, increment : 1 , costformula : '10 + value * 5'},
        {n :'rate', start : 1 , max : 20, increment : 1 , costformula : '10 * Math.exp(value)'},
    ],
    castle:[
        {n:'life', start : 100 , max : 5000, increment : 50 , costformula : '100'},
        {n:'power', start : 1 , max : 100, increment : 1 , costformula : '100 + value * 50'},
        {n:'speed', start : 1 , max : 50, increment : 1 , costformula : '100 + value * 100'},
        {n:'range', start : 1000 , max : 500, increment : 50 , costformula : '100'},
        {n:'timer', start : 0.5 , max : 20, increment : 0.2 , costformula : '10 * Math.exp(value)'},
        {n:'soldierpower', start : 1 , max : 20, increment : 1 , costformula : '3 * Math.exp(value)'},
        {n:'soldierlife', start : 1 , max : 200, increment : 1 , costformula : 'Math.exp(value)'},
    ]
}
var songBgm = {songData: [{ i: [0, 0, 140, 0, 0, 0, 140, 0, 0, 255, 158, 158, 158, 0, 0, 0, 0, 51, 2, 1, 2, 58, 239, 0, 32, 88, 1, 157, 2 ],p: [1,1,1,1],c: [{n: [161,,,,,,,,,,,,,,,,163,,,,,,,,159],f: []}]},{ i: [0, 91, 128, 0, 0, 95, 128, 12, 0, 0, 12, 0, 72, 0, 0, 0, 0, 0, 0, 0, 2, 255, 0, 0, 32, 83, 3, 130, 4 ],p: [1,1,2,1],c: [{n: [144,,151,,149,,147,,146,,147,,146,,144,,144,,151,,149,,147,,146,,147,,146,,144],f: []},{n: [156,,163,,161,,159,,158,,159,,158,,156,,156,,163,,161,,159,,158,,159,,158,,168],f: []}]},{ i: [0, 16, 133, 0, 0, 28, 126, 12, 0, 0, 2, 0, 60, 0, 0, 0, 0, 0, 0, 0, 2, 91, 0, 0, 32, 47, 3, 157, 2 ],p: [1,2,1,2],c: [{n: [144,,151,,149,,147,,146,,147,,146,,144,,144,,151,,149,,147,,146,,147,,146,,144],f: []},{n: [168,,175,,173,,171,,170,,171,,170,,168,,168,,175,,173,,171,,170,,171,,170,,168],f: []}]},{ i: [0, 255, 116, 79, 0, 255, 116, 0, 83, 0, 4, 6, 69, 52, 0, 0, 0, 0, 0, 0, 2, 14, 0, 0, 32, 0, 0, 0, 0 ],p: [1,1,1,1],c: [{n: [144,,151,,149,,147,,146,,147,,146,,144,,144,,151,,149,,147,,146,,147,,146,,144,,,159,,,,159,,,,159,,,,,,,,,,,,159,,159],f: []}]},],rowLen: 8269,   patternLen: 32,  endPattern: 3,  numChannels: 4  };
var songBgm2 = {songData: [{ i: [2, 100, 128, 0, 3, 201, 128, 0, 0, 0, 5, 6, 58, 0, 0, 0, 0, 195, 6, 1, 2, 135, 0, 0, 32, 147, 6, 121, 6 ],p: [2,2],c: [{n: [155,,160,,155,,160,,162,,160,,162,,163,,162,,160,,158,,155,,160,,155,,160,,155,,160,,158,,157,,155,,,,160,,,,160,,,,,,,,,,,,,,,,,,160,,,,160],f: []},{n: [157,,162,,157,,162,,164,,162,,164,,165,,164,,162,,160,,157,,162,,157,,162,,157,,162,,160,,159,,157,,,,162,,,,162,,,,,,,,,,,,,,,,,,162,,,,162],f: []}]},{ i: [0, 214, 104, 64, 0, 204, 104, 0, 64, 229, 4, 40, 43, 51, 0, 0, 0, 231, 6, 1, 3, 183, 15, 0, 32, 232, 4, 74, 6 ],p: [2,1],c: [{n: [144,,,,,,,,,,,,146,146,,,,,,,135,,,,135,135,,,,,,,135],f: []},{n: [157,,162,,157,,162,,,,,,,,,,,,,,,,,,162,,157,,162,,,,,,,,,,,,,,,,,,162],f: []}]},{ i: [0, 255, 106, 64, 0, 255, 106, 0, 64, 0, 5, 7, 164, 0, 0, 0, 0, 0, 0, 0, 2, 255, 0, 2, 32, 83, 5, 25, 1 ],p: [2,1],c: [{n: [143,,,,,,,,,,,,,,,,,,,,,,143],f: []},{n: [135,,,,,,,,135,,,,,,,,135,,,,,,,,135,,,,,,,,135],f: []}]},{ i: [0, 214, 104, 64, 0, 204, 104, 0, 64, 229, 4, 40, 43, 51, 0, 0, 0, 231, 6, 1, 3, 183, 15, 0, 32, 232, 4, 74, 6 ],p: [1,1],c: [{n: [,,,,,,,,176,,174,,176,,177,,176,,174,,172,,169,,,,,,,,169,,174,,172,,171,,169],f: []}]},{ i: [1, 255, 128, 0, 1, 154, 128, 9, 0, 0, 7, 5, 52, 0, 0, 0, 0, 0, 0, 0, 2, 255, 0, 0, 32, 47, 3, 146, 2 ],p: [2,2],c: [{n: [,,,,,,,,170,,,,,,,,166,,164,,,,,,,,,,170,,,,166,,164,,163],f: []},{n: [,,162,,,,162,,,,,,,,165,,,,,,,,,,162,,,,162,,,,162,,,,159,,,,,,162,,,,162,,,,,,,,,,,,,,,,,,162,,,,162],f: []}]},],rowLen: 5513,   patternLen: 40,  endPattern: 1,  numChannels: 5  };

class CPlayer {
    constructor() {
        this.mOscillators = [
            this.osc_sin,
            this.osc_square,
            this.osc_saw,
            this.osc_tri
        ];
        this.mSong = null;
        this.mLastRow = 0;
        this.mCurrentCol = 0;
        this.mNumWords = 0;
        this.mMixBuf = null;
    }
    osc_sin(value) {
        return Math.sin(value * 6.283184);
    }
    osc_saw(value) {
        return 2 * (value % 1) - 1;
    }
    osc_square(value) {
        return (value % 1) < 0.5 ? 1 : -1;
    }
    osc_tri(value) {
        const v2 = (value % 1) * 4;
        if (v2 < 2) return v2 - 1;
        return 3 - v2;
    }
    getnotefreq(n) {
        return 0.003959503758 * (2 ** ((n - 128) / 12));
    }
    createNote(instr, n, rowLen) {
        const osc1 = this.mOscillators[instr.i[0]];
        const o1vol = instr.i[1];
        const o1xenv = instr.i[3] / 32;
        const osc2 = this.mOscillators[instr.i[4]];
        const o2vol = instr.i[5];
        const o2xenv = instr.i[8] / 32;
        const noiseVol = instr.i[9];
        const attack = instr.i[10] * instr.i[10] * 4;
        const sustain = instr.i[11] * instr.i[11] * 4;
        const release = instr.i[12] * instr.i[12] * 4;
        const releaseInv = 1 / release;
        const expDecay = -instr.i[13] / 16;
        let arp = instr.i[14];
        const arpInterval = rowLen * (2 ** (2 - instr.i[15]));
        const noteBuf = new Int32Array(attack + sustain + release);
        let c1 = 0, c2 = 0;
        let o1t = 0;
        let o2t = 0;
        for (let j = 0, j2 = 0; j < attack + sustain + release; j++, j2++) {
            if (j2 >= 0) {
                arp = (arp >> 8) | ((arp & 255) << 4);
                j2 -= arpInterval;
                o1t = this.getnotefreq(n + (arp & 15) + instr.i[2] - 128);
                o2t = this.getnotefreq(n + (arp & 15) + instr.i[6] - 128) * (1 + 0.0008 * instr.i[7]);
            }
            let e = 1;
            if (j < attack) {
                e = j / attack;
            } else if (j >= attack + sustain) {
                e = (j - attack - sustain) * releaseInv;
                e = (1 - e) * (3 ** (expDecay * e));
            }
            c1 += o1t * e ** o1xenv;
            let rsample = osc1(c1) * o1vol;
            c2 += o2t * e ** o2xenv;
            rsample += osc2(c2) * o2vol;
            if (noiseVol) {
                rsample += (2 * Math.random() - 1) * noiseVol;
            }
            noteBuf[j] = (80 * rsample * e) | 0;
        }
        return noteBuf;
    }
    initGenBuffer(song,context,callback){
        this.init(song);
        var loop = ()=>{
            console.log('generating ');
            var done = this.generate();
            if(done == 1){
                var buffer = this.createAudioBuffer(context);
                console.log('done');
                return callback(buffer);
            }
            else{
                requestAnimationFrame(loop);
            }
        }
        requestAnimationFrame(loop);
    }
    init(song) {
        this.mSong = song;
        this.mLastRow = song.endPattern;
        this.mCurrentCol = 0;
        this.mNumWords = song.rowLen * song.patternLen * (this.mLastRow + 1) * 2;
        this.mMixBuf = new Int32Array(this.mNumWords);
    }
    generate() {
        let i, j, b, p, row, col, n, cp, k, t, lfor, e, x, rsample, rowStartSample, f, da;
        const chnBuf = new Int32Array(this.mNumWords);
        const instr = this.mSong.songData[this.mCurrentCol];
        const rowLen = this.mSong.rowLen;
        const patternLen = this.mSong.patternLen;
        let low = 0, band = 0, high;
        let lsample, filterActive = false;
        const noteCache = [];
        for (p = 0; p <= this.mLastRow; ++p) {
            cp = instr.p[p];
            for (row = 0; row < patternLen; ++row) {
                const cmdNo = cp ? instr.c[cp - 1].f[row] : 0;
                if (cmdNo) {
                    instr.i[cmdNo - 1] = instr.c[cp - 1].f[row + patternLen] || 0;
                    if (cmdNo < 17) {
                        noteCache.length = 0;
                    }
                }
                const oscLFO = this.mOscillators[instr.i[16]];
                const lfoAmt = instr.i[17] / 512;
                const lfoFreq = (2 ** (instr.i[18] - 9)) / rowLen;
                const fxLFO = instr.i[19];
                const fxFilter = instr.i[20];
                const fxFreq = instr.i[21] * 43.23529 * 3.141592 / 44100;
                const q = 1 - instr.i[22] / 255;
                const dist = instr.i[23] * 1e-5;
                const drive = instr.i[24] / 32;
                const panAmt = instr.i[25] / 512;
                const panFreq = 6.283184 * (2 ** (instr.i[26] - 9)) / rowLen;
                const dlyAmt = instr.i[27] / 255;
                const dly = instr.i[28] * rowLen & ~1;  
                rowStartSample = (p * patternLen + row) * rowLen;
                for (col = 0; col < 4; ++col) {
                    n = cp ? instr.c[cp - 1].n[row + col * patternLen] : 0;
                    if (n) {
                        if (!noteCache[n]) {
                            noteCache[n] = this.createNote(instr, n, rowLen);
                        }
                        const noteBuf = noteCache[n];
                        for (j = 0, i = rowStartSample * 2; j < noteBuf.length; j++, i += 2) {
                          chnBuf[i] += noteBuf[j];
                        }
                    }
                }
                for (j = 0; j < rowLen; j++) {
                    k = (rowStartSample + j) * 2;
                    rsample = chnBuf[k];
                    if (rsample || filterActive) {
                        f = fxFreq;
                        if (fxLFO) {
                            f *= oscLFO(lfoFreq * k) * lfoAmt + 0.5;
                        }
                        f = 1.5 * Math.sin(f);
                        low += f * band;
                        high = q * (rsample - band) - low;
                        band += f * high;
                        rsample = fxFilter == 3 ? band : fxFilter == 1 ? high : low;
                        if (dist) {
                            rsample *= dist;
                            rsample = rsample < 1 ? rsample > -1 ? this.osc_sin(rsample * .25) : -1 : 1;
                            rsample /= dist;
                        }
                        rsample *= drive;
                        filterActive = rsample * rsample > 1e-5;
                        t = Math.sin(panFreq * k) * panAmt + 0.5;
                        lsample = rsample * (1 - t);
                        rsample *= t;
                    } else {
                        lsample = 0;
                    }
                    if (k >= dly) {
                        lsample += chnBuf[k - dly + 1] * dlyAmt;
                        rsample += chnBuf[k - dly] * dlyAmt;
                    }
                    chnBuf[k] = lsample | 0;
                    chnBuf[k + 1] = rsample | 0;
                    this.mMixBuf[k] += lsample | 0;
                    this.mMixBuf[k + 1] += rsample | 0;
                }
            }
        }
        this.mCurrentCol++;
        return this.mCurrentCol / this.mSong.numChannels;
    }
    createAudioBuffer(context) {
        const buffer = context.createBuffer(2, this.mNumWords / 2, 44100);
        for (let i = 0; i < 2; i++) {
            const data = buffer.getChannelData(i);
            for (let j = i; j < this.mNumWords; j += 2) {
                data[j >> 1] = this.mMixBuf[j] / 65536;
            }
        }
        return buffer;
    }
    createWave() {
        const headerLen = 44;
        const l1 = headerLen + this.mNumWords * 2 - 8;
        const l2 = l1 - 36;
        const wave = new Uint8Array(headerLen + this.mNumWords * 2);
        wave.set([
            82, 73, 70, 70, 
            l1 & 255, (l1 >> 8) & 255, (l1 >> 16) & 255, (l1 >> 24) & 255,
            87, 65, 86, 69, 
            102, 109, 116, 32, 
            16, 0, 0, 0, 
            1, 0, 
            2, 0, 
            68, 172, 0, 0, 
            16, 177, 2, 0, 
            4, 0, 
            16, 0, 
            100, 97, 116, 97, 
            l2 & 255, (l2 >> 8) & 255, (l2 >> 16) & 255, (l2 >> 24) & 255
        ]);
        for (let i = 0, idx = headerLen; i < this.mNumWords; ++i) {
            let y = this.mMixBuf[i];
            y = y < -32767 ? -32767 : (y > 32767 ? 32767 : y);
            wave[idx++] = y & 255;
            wave[idx++] = (y >> 8) & 255;
        }
        return wave;
    }
    getData(t, n) {
        const i = 2 * Math.floor(t * 44100);
        const d = new Array(n);
        for (let j = 0; j < 2 * n; j += 1) {
            const k = i + j;
            d[j] = t > 0 && k < this.mMixBuf.length ? this.mMixBuf[k] / 32768 : 0;
        }
        return d;
    }
}
class SoundSystem{
    constructor(){
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.audioContextSingleFire = new (window.AudioContext || window.webkitAudioContext)();
        this.buffer1 = this.generateShootingSound();
        this.buffer2 = this.generateExplosion();
        var cplayer = new CPlayer();
        var cplayer2 = new CPlayer();
        this.bgmTime = 0;
        this.pausedTime = 0;
        this.startTime = 0;
        cplayer.initGenBuffer(songBgm, this.audioContext,(buffer)=>{
            this.bgmBuffer = buffer;
        });
        cplayer2.initGenBuffer(songBgm2, this.audioContext,(buffer)=>{
            this.bgm2Buffer = buffer;
        });
    }
    generateShootingSound() {
        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.3; 
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            
            data[i] = (Math.random() - 0.5) * 2;
        }
        const attackTime = 0.01; 
        const decayTime = 0.1;  
        const sustainLevel = 0.2; 
        const releaseTime = duration - attackTime - decayTime; 
        for (let i = 0; i < data.length; i++) {
            let time = i / sampleRate;
            if (time < attackTime) {
                data[i] *= time / attackTime; 
            } else if (time < attackTime + decayTime) {
                data[i] *= 1 - (time - attackTime) / decayTime * (1 - sustainLevel); 
            } else if (time > duration - releaseTime) {
                data[i] *= (duration - time) / releaseTime; 
            }
        }
        for (let i = 0; i < data.length; i++) {
            let time = i / sampleRate;
            
            data[i] *= Math.sin(2 * Math.PI * time * (440 + Math.random() * 100)); 
        }
        return buffer;
    }
    generateSound() {
        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.01; 
        const frequency = 10; 
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
          data[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate);
        }
        return buffer;
    }
    generateExplosion() {
        const sampleRate = this.audioContext.sampleRate;
        const duration = 0.5; 
        const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            data[i] = Math.random() * 2 - 1; 
        }
        const attackTime = 0.05; 
        const decayTime = 0.2; 
        const sustainLevel = 0.0; 
        const releaseTime = duration - attackTime - decayTime; 
        for (let i = 0; i < data.length; i++) {
            let time = i / sampleRate;
            if (time < attackTime) {
                data[i] *= time / attackTime; 
            } else if (time < attackTime + decayTime) {
                data[i] *= 1 - (time - attackTime) / decayTime * (1 - sustainLevel); 
            } else if (time > duration - releaseTime) {
                data[i] *= (duration - time) / releaseTime; 
            }
        }
        return buffer;
    }
    playS1(){
        const source = this.audioContextSingleFire.createBufferSource();
        source.buffer = this.buffer1;
        source.connect(this.audioContextSingleFire.destination);
        source.start();
    }
    playS2(){
        const source = this.audioContextSingleFire.createBufferSource();
        source.buffer = this.buffer2;
        source.connect(this.audioContextSingleFire.destination);
        source.start();
    }
    startBgm(id = 1){
        if(this.bgmsource){
            this.bgmsource.stop();
            this.bgmsource = null;
        }
        if(this.bgmBuffer){
            this.bgmsource = this.audioContext.createBufferSource();
            this.bgmsource.buffer = id==1 ? this.bgmBuffer : this.bgm2Buffer;
            this.bgmsource.connect(this.audioContext.destination);
            this.bgmsource.loop = true;
            this.bgmsource.start(0, this.pausedTime);
            this.startTime = this.audioContext.currentTime - this.pausedTime;
        }
    }
    stopBgm(id){
        if(this.bgmsource){
            this.pausedTime = this.audioContext.currentTime - this.startTime;
            this.bgmsource.stop();
            this.bgmsource = null;
        }
    }
}
class TowerDefenceMapGen{
    constructor(rows,cols){
        this.rows = rows;
        this.cols = cols;
        while(true){
            var maze = new MazeGenerator(rows,cols);
            var pf = new Pathfinder(maze.grid);
            var path = pf.findPath(0,0,rows-1,cols-1);
            this.path = path;
            this.grid = new Array(rows).fill(null).map(()=>new Array(cols).fill(false));
            path.forEach(x=>{this.grid[x[0]][x[1]] = true});
            if(path.length > rows * 3) break;
        }
    }
    gridToGif(grid,w,h,factor=4){
        var canvas = G.makeCanvas(w*factor,h*factor);
        var ctx = canvas.ctx;
        for(var i = 0; i < this.rows; i++){
            for(var j = 0 ; j < this.cols ; j++){
                if(grid[i][j]){
                    ctx.fillRect(i*factor,j*factor,factor,factor);
                }
            }
        }
        document.body.append(canvas);
    }
}
class MazeGenerator {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = new Array(rows).fill(null).map(()=>new Array(cols).fill(true));
        this.generateMaze();
        for(var i = 0; i < this.rows; i++){
            this.grid[i][cols-1] = false;
        }
    }
    invertGrid(){
        var grid2 = new Array(this.rows).fill(null).map(()=>new Array(this.cols).fill(false));
        for(var i = 0; i < this.rows; i++){
            for(var j = 0 ; j < this.cols ; j++){
                grid2[i][j] = !this.grid[i][j];
            }
        }
        return grid2;
    }
    generateMaze() {this.clearMaze();this.carvePassage(0, 0);return this.grid;}
    clearMaze() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col] = true;
            }
        }
    }
    carvePassage(row, col) {
        this.grid[row][col] = false;
        const directions = this.shuffleDirections();
        for (const direction of directions) {
            const newRow = row + direction[0];
            const newCol = col + direction[1];
            if (this.isValidCell(newRow, newCol) && this.grid[newRow][newCol]) {
                const betweenRow = row + direction[0] / 2;
                const betweenCol = col + direction[1] / 2;
                this.grid[betweenRow][betweenCol] = false;
                this.carvePassage(newRow, newCol);
            }
        }
    }
    isValidCell(row, col) {return row >= 0 && row < this.rows && col >= 0 && col < this.cols;}
    shuffleDirections() {
        const directions = [[-2, 0], [2, 0], [0, -2], [0, 2]];
        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i],directions[j]] = [directions[j], directions[i]];
        }
        return directions;
    }
}
class Pathfinder {
    constructor(maze) {
        this.maze = maze;
        this.rows = maze.length;
        this.cols = maze[0].length;
    }
    findPath(startRow, startCol, endRow, endCol) {
        startRow = Math.floor(startRow);
        startCol = Math.floor(startCol);
        endRow = Math.floor(endRow);
        endCol = Math.floor(endCol);
        const openSet = [];
        const closedSet = new Set();
        const cameFrom = {};
        const gScore = new Array(this.rows).fill(null).map(()=>new Array(this.cols).fill(Infinity));
        gScore[startRow][startCol] = 0;
        const fScore = new Array(this.rows).fill(null).map(()=>new Array(this.cols).fill(Infinity));
        fScore[startRow][startCol] = this.heuristic(startRow, startCol, endRow, endCol);
        openSet.push([startRow, startCol]);
        while (openSet.length > 0) {
            const current = this.findLowestFScore(openSet, fScore);
            const [currentRow,currentCol] = current;
            if (currentRow === endRow && currentCol === endCol) {
                return this.reconstructPath(cameFrom, current);
            }
            openSet.splice(openSet.indexOf(current), 1);
            closedSet.add(`${currentRow}-${currentCol}`);
            const neighbors = this.getNeighbors(currentRow, currentCol);
            for (const neighbor of neighbors) {
                const [neighborRow,neighborCol] = neighbor;
                if (closedSet.has(`${neighborRow}-${neighborCol}`) || this.maze[neighborRow][neighborCol]) {
                    continue;
                }
                const tentativeGScore = gScore[currentRow][currentCol] + 1;
                if (tentativeGScore < gScore[neighborRow][neighborCol]) {
                    cameFrom[`${neighborRow}-${neighborCol}`] = current;
                    gScore[neighborRow][neighborCol] = tentativeGScore;
                    fScore[neighborRow][neighborCol] = tentativeGScore + this.heuristic(neighborRow, neighborCol, endRow, endCol);
                    if (!openSet.includes(neighbor)) {
                        openSet.push(neighbor);
                    }
                }
            }
        }
        return null;
    }
    heuristic(row1, col1, row2, col2) {
        return Math.abs(row1 - row2) + Math.abs(col1 - col2);
    }
    findLowestFScore(nodes, fScore) {
        let lowestNode = nodes[0];
        let lowestFScore = fScore[lowestNode[0]][lowestNode[1]];
        for (const node of nodes) {
            const [row,col] = node;
            if (fScore[row][col] < lowestFScore) {
                lowestNode = node;
                lowestFScore = fScore[row][col];
            }
        }
        return lowestNode;
    }
    getNeighbors(row, col) {
        const neighbors = [];
        if (row > 0)
            neighbors.push([row - 1, col]);
        if (row < this.rows - 1)
            neighbors.push([row + 1, col]);
        if (col > 0)
            neighbors.push([row, col - 1]);
        if (col < this.cols - 1)
            neighbors.push([row, col + 1]);
        return neighbors;
    }
    reconstructPath(cameFrom, current) {
        const path = [current];
        while (cameFrom.hasOwnProperty(`${current[0]}-${current[1]}`)) {
            current = cameFrom[`${current[0]}-${current[1]}`];
            path.unshift(current);
        }
        return path;
    }
}
class G{
    static makeCanvas(w=0,h=0){
        let c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        c.w=w;
        c.h=h;
        c.ctx = c.getContext('2d');
        c.center = {x: w/2,y:h/2}
        c.clear = ()=>{
            c.ctx.clearRect(0,0,w,h);
        }
        return c;
    }
    static GenTable(rows,cols){
        var html = ``;
        for(let i = 0 ; i < rows ; i++){
            html += `<tr>`;
            for(let j = 0 ; j < cols;j++){
                html += `<td></td>`;
            }
            html += `</tr>`;
        }
        var table = document.createElement('table');
        table.innerHTML = html;
        var entities = [];
        var trs = table.querySelectorAll('tr');
        for(let i = 0 ; i < trs.length; i++){
            var tds = trs[i].querySelectorAll('td');
            entities[i] = [...tds];
        }
        table.entities = entities;
        return table;
    }
    static Point(pos){
        return new Point(pos);
    }
    static getEmojiSprite(emoji,size,factor = 1.3, color = '#000'){
        let canvas = G.makeCanvas(size,size);
        var ctx = canvas.ctx;
        ctx.font = `${size/factor}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = color;
        ctx.fillText(emoji,size/2, size*1.1/2);
        return canvas;
    }
    static getTextSprite(text,size, color,  factor = 0.8){
        text = text.toUpperCase();
        let canvas = G.makeCanvas(size * text.length, size);
        for(let i = 0 ; i < text.length;i++){
            var ls = G.getEmojiSprite(text[i],size,factor, color);
            canvas.ctx.drawImage(ls,i * size,0);
        }
        return canvas;
        
    }
    static fuseImage(canvas,canvas2,composite = 'source-atop'){
        let buffer = G.makeCanvas(canvas.width,canvas.height);
        let ctx = buffer.ctx;
        ctx.drawImage(canvas,0,0);
        ctx.globalCompositeOperation = composite;
        for(let i = 0 ; i < canvas.width/canvas2.width;i++){
            for(let j = 0 ; j < canvas.height/canvas2.height;j++){
                ctx.drawImage(canvas2,i * canvas2.width,j * canvas2.height);
            }
        }
        return buffer;
    }
    static rotateCanvas(_image,deg){
        var image = (deg % 90 != 0) ? G.prepForRotate(_image) : _image;
        var canvas = G.makeCanvas(image.width,image.height);
        var ctx = canvas.ctx;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(deg * Math.PI / 180);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);
        ctx.restore();
        return canvas;
    }
    static prepForRotate(image){
        let d = Math.sqrt( Math.pow(image.width,2)+Math.pow(image.height,2));
        let buffer = G.makeCanvas(d,d);
        buffer.ctx.drawImage(image,(d - image.width) /2,(d - image.height) /2);
        return buffer;
    }
    static mirror(canvas,hor = true){
        let buffer = G.makeCanvas(canvas.width,canvas.height);
        let context = buffer.ctx;
        context.save();
        if(hor){
            context.scale(-1, 1);
            context.drawImage(canvas, 0, 0, canvas.width*-1, canvas.height);
        }
        else{
            context.scale(1, -1);
            context.drawImage(canvas, 0, 0, canvas.width, canvas.height*-1);
        }
        context.restore();
        return buffer;
    }
    static gridBG(color1 = "lightgrey",color2 = null, scale = 8, width=1){
        var canvas = G.makeCanvas(scale,scale);
        var ctx = canvas.ctx;
        ctx.fillStyle = color1;
        ctx.fillRect(0,0,scale,scale);
        if(color2 == null){
            ctx.clearRect(0,0,scale-width,scale-width);
        }
        else{
            ctx.fillStyle = color2;
            ctx.fillRect(0,0,scale-width,scale-width);
        }
        return canvas;
    }
    static Lightify(canvas,opacity){
        let buffer = G.makeCanvas(canvas.width,canvas.height);
        buffer.ctx.globalAlpha = opacity;
        buffer.ctx.drawImage(canvas,0,0);
        buffer.ctx.globalAlpha = 1;
        return buffer;
    }
    static makeDom(html){
        var h = document.createElement('div');
        h.innerHTML = html;
        return h.firstChild;
    }
    static shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {const j = Math.floor(Math.random() * (i + 1)); [array[i], array[j]] = [array[j], array[i]];}return array;
    }
    static repeatCanvas(canvas,r,c=0){
        if(c == 0 ) c = r;
        var buffer = G.makeCanvas(canvas.width * c, canvas.height*r);
            for(let i = 0 ; i < r;i++){
                for(let j = 0 ; j < c;j++){
                    buffer.ctx.drawImage(canvas, j*canvas.width, i*canvas.height);
                }
            }
            return buffer;
    }
    static merge(list,w,h){
        var c = G.makeCanvas(w,h);
        for(let i in list){
            c.ctx.drawImage(list[i],0,0);
        }
        return c;
    }
    static brickPattern(color1 = "#fff",color2 = "#000", r = 1){
        var canvas = G.makeCanvas(8,8);
        var ctx = canvas.ctx;
        ctx.fillStyle = color1;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = color2;
        ctx.fillRect(7,0,1,4);
        ctx.fillRect(0,3,8,1);
        ctx.fillRect(4,4,1,4);
        ctx.fillRect(0,7,8,1);
        if(r > 1){return G.repeatCanvas(canvas,r,r);}
        return canvas;
    }
    static randomPattern(color1,color2,bias = 0.3,w=8,h=8){
        var canvas = G.makeCanvas(w,h);
        var ctx = canvas.ctx;
        ctx.fillStyle = color1;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = color2;
        for(let i = 0 ; i < h ; i ++){
            for(let j = 0 ; j < w ; j++){
                if(Math.random() < bias) ctx.fillRect(i,j,1,1);
            }
        }
        return canvas;
    }
    static MakeCircle(r,stroke = null,fill = null){
        var s = G.makeCanvas(r*2+2,r*2+2);
        var ctx = s.ctx;
        ctx.beginPath();
        ctx.arc(s.width/2,s.height/2,r,0,Math.PI * 2,false);
        if(stroke != null){ctx.strokeStyle = stroke;ctx.stroke();}
        if(fill != null){ctx.fillStyle = fill;ctx.fill();}
        return s;
    }
    static movePointToward(pos,rotation,distance){
        const rRad = rotation * (Math.PI / 180);
        const vx = distance * Math.cos(rRad);
        const vy = distance * Math.sin(rRad);
        return {
            x : pos.x + vx,
            y : pos.y + vy
        }
    }
    static loadImage(url,callback){
        var img = new Image();
        img.src = url;
        img.addEventListener('load',()=>{
            callback(img);
        });
    }
    static getColor(r, g, b, a){
        if(r+g+b+a == 0){return null;}
        else if(r+g+b == 0){return '#000000';}
        else if (r > 255 || g > 255 || b > 255){return '#000000';}
        return '#' + ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
    }
    static getColorMatrix (canvas,changefct){
        var context = canvas.getContext('2d');
        var width = canvas.width;
        var height = canvas.height;
        var imageData = context.getImageData(0, 0, width, height);
        var data = imageData.data;
        var colorMatrix = [];
        for (var i = 0; i < data.length; i += 4) {
            colorMatrix.push(
                G.getColor(
                    data[i],
                    data[i + 1],
                    data[i + 2],
                    data[i + 3]
                    )
                );
        }
        var matrix = [];
        for(let i = 0 ; i < canvas.height;i++){matrix[i] = [];}
        let c = 0, r = 0;
        for(let i = 0 ; i < colorMatrix.length;i++){
            if(c >= canvas.width){r++;c=0}
            matrix[r][c] = colorMatrix[i];
            if(changefct) matrix[r][c] = changefct(matrix[r][c]);
            c++;
        }
        return matrix;
    }
    static imgToCanvas(img){
        var c = G.makeCanvas(img.width,img.height);
        c.ctx.drawImage(img,0,0);
        return c;
    }
    static colorsMatrixToSprite(matrix,scale = 1,deform = null){
        let height = matrix.length;
        let width = Math.max(...matrix.map((row)=> row.length));
        var buffer = G.makeCanvas(width * scale,height* scale);
        var ctx = buffer.ctx;
        for(let i = 0 ; i < height;i++){
            for(let j = 0 ; j < width;j++){
                var color = matrix[i][j];
                if(deform) color = deform(color);
                if(!color || color == '') continue;
                ctx.fillStyle = color;
                ctx.fillRect(j*scale,i*scale,scale,scale);
            }
        }
        return buffer;
    }
    static crop(canvas,x,y,width,height){
        let buffer = G.makeCanvas(width,height);
        buffer.ctx.drawImage(canvas,x,y,width,height,0,0,width,height);
        return buffer;
    }
    static randomColor(){
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {color += letters[Math.floor(Math.random() * 16)];}
        return color; 
    }
    static rand (a=1, b=0){ return b + (a-b)*Math.random();}
    static randInt (a=1, b=0){ return G.rand(a,b)|0;}
}
class Point{
    constructor(pos){
        this.x = pos.x;
        this.y = pos.y;
    }
    moveToward(p2,dist=1){
        var vx = this.x == p2.x ? 0 : this.x < p2.x ? dist : -dist;
        var vy = this.y == p2.y ? 0 : this.y < p2.y ? dist : -dist;
        this.x += vx;
        this.y += vy;
    }
    distance(p2){
        let distance = 0;
        distance += Math.pow((this.x - p2.x), 2);
        distance += Math.pow((this.y - p2.y), 2);
        distance = Math.sqrt(distance);
        return distance;
    }
    getAngleTo(target){
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        
        let angleRadians = Math.atan2(dy, dx);
        return angleRadians * 180/Math.PI;
    }
    moveByAngle(rotation,distance){
        const rRad = rotation * (Math.PI / 180);
        const vx = distance * Math.cos(rRad);
        const vy = distance * Math.sin(rRad);
        this.x = this.x + vx;
        this.y = this.y + vy;
    }
}
class Entity{
    constructor(){
        this.time = 0;
        this.tps = 0;
        this.life = 1;
    }
    update(t){
        var tps = parseInt(t/1000);
        if(this.tps != tps){
            this.updatePerSecond(t);
        }
        this.updatePerFrame(t);
        this.tps = tps;
        this.time = t;
    }
    updatePerFrame(t){}
    updatePerSecond(t){}
    draw(ctx){
        ctx.drawImage(this.sprite, this.pos.x - this.sprite.width/2,this.pos.y - this.sprite.height/2);
    }
}
class Enemy extends Entity{
    constructor(generator,sprite, level = 0,isboss = false){
        super();
        this.generator = generator;
        this.path = generator.path;
        this.game = generator.game;
        this.time = 0;
        this.timer = 0.002;
        this.sprite = sprite;
        this.pos = G.Point(this.path[0]);
        this.pathIndex = 1;
        this.level = level;
        this.speed = (1 + level) / 8;
        this.speedBuffer = 0;
        this.speedBufferCap = 10;
        this.life = 10 + level * 5;
        this.lifeMax = 10 + level * 5;
        this.isboss = isboss;
        this.frame = 0;
        if(isboss){
            this.speed = this.speed/2;
            this.life = this.life*4;
            this.lifeMax = this.life*4;
        }
        this.game.objects.push(this);
    }
    update(time){
        if(this.pathIndex < this.path.length) this.move();
        else this.attack();
        if(this.life <= 0 ){
            this.game.objects = this.game.objects.filter(x=>x!=this);
        }
    }
    attack(){
        this.game.castle.life--;
    }
    move(){
        var target = this.path[this.pathIndex];
        var distance = this.pos.distance(target);
        if(distance < this.speed){
            this.pos = G.Point(this.path[this.pathIndex]);
            this.pathIndex++;
        }
        else{
            this.pos.moveToward(target,this.speed);
            if(this.isboss == false){
                this.sprite = this.game.spriteEngine.mobAnimations[parseInt(this.frame/10)];
                this.frame++;
                if(this.frame >= 30) this.frame = 0;
            }
        }
    }
    draw(ctx){
        ctx.fillStyle = '#ffffff20';
        ctx.fillRect(
            this.pos.x - this.sprite.width/2,
            this.pos.y - this.sprite.height/2,
            (this.life / this.lifeMax) * this.sprite.width,
            3
        );
        ctx.drawImage(this.sprite,
            this.pos.x - this.sprite.width/2,
            this.pos.y - this.sprite.height/2
        );
    }
}
class Boss extends Enemy{
    constructor(generator,sprite, level = 0,isboss = true){
        super(generator,sprite,level,true);
        this.sprite = generator.game.spriteEngine.boss;
        this.attackTimer = 0;
        this.attackTimerCap = 150 - level * 5;
        this.attackRange = CELLSIZE * 3 * level;
    }
    update(time){
        super.update(time);
        this.attackTimer++;
        if(this.attackTimer > this.attackTimerCap){
            this.attackTimer = 0;
            let nearbyTower = this.game.objects.find(x=>x instanceof DefenceTower && this.pos.distance(x.pos) < this.attackRange);
            if(nearbyTower != null){
                new MobAttack(this,this.pos,nearbyTower.pos);
            }
        }
    }
    attack(){
        this.game.castle.life--;
    }
    move(){
        var target = this.path[this.pathIndex];
        var distance = this.pos.distance(target);
        if(distance < this.speed){
            this.pos = G.Point(this.path[this.pathIndex]);
            this.pathIndex++;
        }
        else{
            this.pos.moveToward(target,this.speed);
            if(this.isboss == false){
                this.sprite = this.game.spriteEngine.mobAnimations[parseInt(this.frame/10)];
                this.frame++;
                if(this.frame >= 30) this.frame = 0;
            }
        }
    }
    draw(ctx){
        ctx.fillStyle = '#ffffff20';
        ctx.fillRect(
            this.pos.x - this.sprite.width/2,
            this.pos.y - this.sprite.height/2,
            (this.life / this.lifeMax) * this.sprite.width,
            3
        );
        ctx.drawImage(this.sprite,
            this.pos.x - this.sprite.width/2,
            this.pos.y - this.sprite.height/2
        );
    }
    getBulletSprite(){
        return G.getEmojiSprite(`💣`,10,1.2);
    }
}
class Bullet extends Entity{
    constructor(tower,pos,target, effect = null){
        super();
        this.effect = effect;
        this.tower = tower;
        this.game = tower.game;
        this.pos = G.Point(pos);
        this.target = G.Point(target);
        this.rotation = this.pos.getAngleTo(target);
        this.life = 1;
        this.power= tower.power;
        this.type = tower.type;
        this.speed = tower.speed;
        this.sprite = tower.getBulletSprite();
        this.game.objects.push(this);
        this.distance = 0;
        if(this.game.config.sound) this.game.SoundSystem.playS1();
    }
    update(t){
        this.ApplyUpdate(this.speed,0);
    }
    async ApplyUpdate(times,current){
        this.pos.moveByAngle(this.rotation,1);
        var target = this.game.objects.find(x=> x instanceof Enemy && x.pos.distance(this.pos) < x.sprite.width/2);
        if(target){
            if(this.effect == 'slow'){
                target.speed = Math.max(0.1, target.speed - this.power/20);
            }
            if(this.effect == 'zap'){
                var target2 = this.game.objects.find(x=> x!= target && x instanceof Enemy && x.pos.distance(this.pos) < CELLSIZE*2);
                if(target2 != null){
                    var zapeffect = new Bullet(this.tower,this.pos,target2.pos,'');
                }
            }
            target.life -= parseInt(this.power);
            this.life = 0;
            this.game.objects = this.game.objects.filter(x=>x != this);
            if(target.life <= 0){
                this.game.cash += 10 * target.level;
                if(this.game.config.sound) this.game.SoundSystem.playS2();
            }
            return;
        }
        this.distance++;
        if(this.distance > this.tower.range) {this.game.objects = this.game.objects.filter(x=>x!=this);return false;}
        if(this.distance > this.game.canvas.w + this.game.canvas.h) {this.game.objects = this.game.objects.filter(x=>x!=this);return false;}
        if(current < times){
            this.ApplyUpdate(times,current+1);
        }
    }
    draw(ctx){
        ctx.drawImage(this.sprite, this.pos.x - this.sprite.width/2,this.pos.y - this.sprite.height/2);
    }
}
class MobAttack extends Entity{
    constructor(mob,pos,target){
        super();
        this.mob = mob;
        this.game = mob.game;
        this.pos = G.Point(pos);
        this.life = 1;
        this.rotation = this.pos.getAngleTo(target);
        this.sprite = mob.getBulletSprite();
        this.speed = mob.level;
        this.power = mob.level;
        this.game.objects.push(this);
    }
    update(t){
        this.ApplyUpdate(this.speed,0);
    }
    ApplyUpdate(times,current){
        this.pos.moveByAngle(this.rotation,1);
        var target = this.game.objects.find(x=> x instanceof DefenceTower && x.pos.distance(this.pos) < x.sprite.width/2);
        if(target){
            target.life -= parseInt(this.power);
            this.life = 0;
            this.game.objects = this.game.objects.filter(x=>x != this);
            if(target.life <= 0){
                this.game.objects = this.game.objects.filter(x=>x != target);
                if(this.game.config.sound) this.game.SoundSystem.playS2();
            }
            return;
        }
        if(this.distance > CELLSIZE*2) {this.game.objects = this.game.objects.filter(x=>x!=this);return false;}
        if(current < times){
            this.ApplyUpdate(times,current+1);
        }
    }
    draw(ctx){
        ctx.drawImage(this.sprite, this.pos.x - this.sprite.width/2,this.pos.y - this.sprite.height/2);
    }
}
class SpriteEngine{
    constructor(img){
        var imgCanvas = G.imgToCanvas(img);
        var mat = G.getColorMatrix(imgCanvas,(r)=>{
            if(r == '') return null;
            if(r == '#fff') return null;
            if(r == '#ffffff') return null;
            return r;
        });
        var MULT = CELLSIZE/16;
        var cvs = G.colorsMatrixToSprite(mat,MULT);
        
        this.blueredtower = G.crop(cvs,0,0,MULT*16,MULT*16);
        this.soldier = G.crop(cvs,MULT*16,0,MULT*16,MULT*16);
        var baseredtower = this.GetRightAndMirror(this.blueredtower);
        this.zaptower = this.GetZapTower(baseredtower);
        this.redtower = this.GetFireTower(baseredtower);
        this.bluetower = this.GetLeftAndMirror(this.blueredtower);
        this.mob = G.crop(cvs,MULT*32,0,MULT*16,MULT*16);
        this.boss = G.crop(cvs,MULT*48,0,MULT*16,MULT*16);
        
        MULT = 8;
        this.cvsX3 = G.colorsMatrixToSprite(mat,MULT);
        this.bossX3 = G.crop(this.cvsX3,MULT*48,0,MULT*16,MULT*16);
        this.mobX3 = G.crop(this.cvsX3,MULT*32,0,MULT*16,MULT*16);
        this.mobAnimations = this.AnimateEnemy();
        this.cursor = this.GenerateCursor();
        this.castle = this.GetCastle();
    }
    GetZapTower(base){
        var mat = G.getColorMatrix(base,(r)=>{
            if(r == '#ff0000') return `#fbf236`;
            if(r == '#a30000') return `#a79e03`;
            return r;
        });
        var canvas = G.colorsMatrixToSprite(mat,1);
        var zapEmoji = G.getEmojiSprite(`⚡`,CELLSIZE/2,1.2);
        canvas.ctx.drawImage(zapEmoji,
            canvas.w/2 - zapEmoji.w/2,
            canvas.h/2 - zapEmoji.h/2,
        );
        return canvas;
    }
    GetFireTower(base){
        var canvas = G.imgToCanvas(base);
        var zapEmoji = G.getEmojiSprite(`🔥`,CELLSIZE/2,1.2);
        canvas.ctx.drawImage(zapEmoji,canvas.w/2 - zapEmoji.w/2,canvas.h/2 - zapEmoji.h/2);
        return canvas;
    }
    GetLeftAndMirror(canvas){
        var left = G.crop(canvas,0,0,canvas.width/2,canvas.height);
        var right = G.mirror(left);
        var canvas2 = G.makeCanvas(canvas.w,canvas.h);
        canvas2.ctx.drawImage(left,0,0);
        canvas2.ctx.drawImage(right,canvas2.w/2,0);
        return canvas2;
    }
    GetRightAndMirror(canvas){
        var right = G.crop(canvas,canvas.width/2,0,canvas.width/2,canvas.height);
        var left = G.mirror(right);
        var canvas2 = G.makeCanvas(canvas.w,canvas.h);
        canvas2.ctx.drawImage(left,0,0);
        canvas2.ctx.drawImage(right,canvas2.w/2,0);
        return canvas2;
    }
    AnimateEnemy(){
        var mainSprite = G.imgToCanvas(this.mob);
        var sprites = [];
        var MULT = CELLSIZE/16;
        var LegL = G.crop(mainSprite, MULT*4,MULT*12,MULT*4,MULT*4);
        var LegR = G.crop(mainSprite, MULT*8,MULT*12,MULT*4,MULT*4);
        var Spear = G.crop(mainSprite, MULT*12,0,MULT*4,MULT*16);
        
        mainSprite.ctx.clearRect(MULT*4,MULT*12,MULT*4,MULT*4);
        mainSprite.ctx.clearRect(MULT*8,MULT*12,MULT*4,MULT*4);
        mainSprite.ctx.clearRect(MULT*12,0,MULT*4,MULT*16);
        var spriteSpec = [
            {L : -1 , R : 0 , S : -1},
            {L : 0 , R : 0 , S : 0},
            {L : 0 , R : -1 , S : 1},
        ];
        for(let i in spriteSpec){
            var spec = spriteSpec[i];
            var clone = G.imgToCanvas(mainSprite);
            clone.ctx.drawImage(LegL, MULT*4, MULT*12 + MULT*spec.L);
            clone.ctx.drawImage(LegR, MULT*8, MULT*12 + MULT*spec.R);
            clone.ctx.drawImage(Spear, MULT*12,0 + MULT*spec.S);
            sprites.push(clone);
        }
        /*sprites = [
            LegL,
            LegR,
            Spear,
            mainSprite
        ]*/
        return sprites;
    }
    GenerateCursor(){
        var canvas = G.makeCanvas(CELLSIZE,CELLSIZE);
        var ctx = canvas.ctx;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0,canvas.w,canvas.h);
        ctx.clearRect(2,2,canvas.w-4,canvas.h-4);
        ctx.clearRect(CELLSIZE/4,0,CELLSIZE/2,CELLSIZE);
        ctx.clearRect(0,CELLSIZE/4,CELLSIZE,CELLSIZE/2);
        return canvas;
    }
    GetCastle(){
        var castle =  G.getEmojiSprite(`🏰`,CELLSIZE,1.1);
        return castle;
    }
    
    static GenCastleSprite(){
        var castle =  G.getEmojiSprite(`🏰`,CELLSIZE,1.1);
        return castle;
    }
    static GenTowerSprite(){
        var bricksMap = G.brickPattern('#959595','#959995',4);
        var castle = G.getEmojiSprite(`♜`,CELLSIZE,1.1);
        var fuse = G.fuseImage(castle,bricksMap);
        return fuse;
    }
    static GenEnemySprite(){
        
        var s = G.getEmojiSprite(`🤡`,CELLSIZE,1.1);
        
        return s;
    }
}
class DefenceTower extends Entity{
    constructor(game, pos , type = 1){
        super();
        this.type=type;
        this.game = game;
        this.sprite = this.getSpriteForType(type);
        this.pos = G.Point(pos);
        var startspecs = SPECS.tower.reduce((acc, {n, start}) => {acc[n] = start; return acc;}, {});
        this.speed = startspecs['speed'] ;
        this.range = startspecs['range'] * this.type;
        this.power = startspecs['power'] * (this.type == 2 ? 1 : 2);
        this.rate =  startspecs['rate'] * (this.type == 2 ? 1 : 2);
        this.life =  startspecs['life'] * this.type;
        this.actionCooldown = 0;
        this.timer = 1.5;
        this.time = 0;
        
    }
    getBulletSprite(){
        var s = G.getEmojiSprite(`🔥`,8,1.2);
        if(this.type == 2){
            s = G.getEmojiSprite(`🧊`,8,1.2);
        }
        if(this.type == 3){
            var s2 = G.getEmojiSprite(`🧊`,6,1.2);
            var s3 = G.merge([s,s2],s.w,s.h);
            return s3;
        }
        if(this.type == 4){
            var s2 = G.getEmojiSprite(`⚡`,8,1.2);
            return s2;
        }
        return s;
    }
    towerWorth(){
        var worth = (this.type * 10)/2 ;
        worth += this.speed/this.type;
        worth += (this.range/this.type)/100;
        worth += this.power/this.type
        worth += this.rate
        return worth;
    }
    getSpriteForType(type){
        if(type == 1){ return this.game.spriteEngine.redtower;}
        else if(type == 2){ return this.game.spriteEngine.bluetower;}
        else if(type == 3){ return this.game.spriteEngine.blueredtower;}
        else if(type == 4){ return this.game.spriteEngine.zaptower;}
        else return this.game.spriteEngine.blueredtower;
    }
    update(time){
        var timepassed = (time - this.time) / 1000;
        if(timepassed >= this.timer){
            var mobs = this.game.objects.filter( x=> x instanceof Enemy  && x.pos.distance(this.pos) < this.range );
            mobs = mobs.sort((a, b) => {return a.pos.distance(this.pos) - b.pos.distance(this.pos);});
            if(mobs.length > 0){
                for(let i = 0 ; i < mobs.length;i++){
                    if(i > this.rate-1) break;
                    var mob = mobs[i];
                    
                    var effect = this.getEffect();
                    var b = new Bullet(this,this.pos,mob.pos,effect);
                }
            }
            this.time = time;
        }
    }
    getEffect(){
        if(this.type == 1) return '';
        if(this.type == 2) return 'slow';
        if(this.type == 3) return 'slow';
        if(this.type == 4) return 'zap';
        return '';
    }
    draw(ctx){
        ctx.drawImage(this.sprite, 
            this.pos.x - this.sprite.width/2,
            this.pos.y - this.sprite.height/2)
    }
    getAttr(name){
        switch(name){
            case 'range': return this.range;
            case 'power': return this.power;
            case 'speed': return this.speed;
            case 'rate': return this.rate;
            case 'life': return this.life;
        }
        return 0;
    }
    setAttr(name,val){
        switch(name){
            case 'power' : this.power = val;return;
            case 'speed' : this.speed = val;return;
            case 'range' : this.range = val;return;
            case 'rate' : this.rate = val;return;
            case 'life' : this.life = val;return;
        }
        console.log(`setting ${name} = ${val} failed`)
    }
}
class MobGenerator{
    constructor(game, path){
        this.isbuffer = false;
        this.time = 0;
        this.game = game;
        this.sprite = game.spriteEngine.mob;
        this.spriteboss = game.spriteEngine.boss;
        this.pos = G.Point(path[0]);
        var specs = SPECS.mobgenerator.specs(game.level,1);
        this.timer = specs.timer;
        this.velocity = specs.velocity;
        this.wavebuffer = specs.wavebuffer;
        this.mobsCap = specs.mobsCap;
        this.wavecap = specs.wavecap;
        this.mobspecs = specs.mob;
        this.mobsMade = 0;
        this.wave = 1;
        this.path = path;
        this.game.objects.push(this);
        var a = new Announcement(this.game,`wave ${this.wave}`,64,2);
        game.objects.push(a);
    }
    makeEnemy(){
        var e = new Enemy(this,this.sprite,this.wave);
        this.mobsMade++;
        if(this.mobsMade % 5 == 0){
            var e2 = new Boss(this,this.spriteboss,this.wave);
        }
        if(this.mobsMade == this.mobsCap){
            var e2 = new Boss(this,this.spriteboss,this.wave);
        }
    }
    update(time){
        var timepassed = (time - this.time) / 1000;
        var enemiesonmap = this.game.objects.filter(x=> x instanceof Enemy).length;
        if(enemiesonmap <= 1) timepassed = this.timer;
        if(this.isbuffer){
            if(timepassed >= this.wavebuffer){
                this.wave++;
                this.timer = Math.max(0,this.timer - this.velocity);
                if(this.wave > this.wavecap) return this.nextMap();
                this.mobsMade = 0;
                var a = new Announcement(this.game,`wave ${this.wave}`,CELLSIZE*2);
                this.game.objects.push(a);
                this.isbuffer = false;
            }
        }
        else{
            if(timepassed >= this.timer){
                if(this.mobsMade < this.mobsCap){
                    this.makeEnemy();
                }
                else if(this.mobsMade >= this.mobsCap){
                    this.isbuffer = true;
                }
                this.time = time;
            }
        }
        this.game.waveprogressdom.innerHTML = `${this.game.parseNum(this.mobsMade)}/${this.game.parseNum(this.mobsCap)}`;
        this.game.wavedom.innerHTML = `${this.wave}`;
        
        this.game.leveldom.innerHTML = `${this.game.level}`;
    }
    draw(ctx){
    }
    nextMap(){
        this.game.midLevelScene(this.game.level+1);
    }
}
class Announcement{
    constructor(game,text,size = 128, timeleft = 120){
        this.timeleft = timeleft;
        this.game = game;
        this.sprite = Announcement.GetSprite(game,text,size);
        this.pos = {
            x: 0,
            y: game.canvas.height/2
        };
        game.objects.push(this);
    }
    static GetSprite(game,text,size){
        var factor = 1.2;
        let canvas = G.makeCanvas(game.canvas.w,size);
        var ctx = canvas.ctx;
        ctx.font = `${size/factor}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text,canvas.w/2, canvas.h*1.1/2);
        return canvas;
    }
    update(t){
        this.timeleft--;
        this.sprite = G.Lightify(this.sprite,0.99);
        if(this.timeleft < 0){
            this.game.objects = this.game.objects.filter(x=>x!=this);
        }
    }
    draw(ctx){
        ctx.drawImage(
            this.sprite,
            this.pos.x,
            this.pos.y,
        );
    }
}
class Castle{
    constructor(game,pos){
        this.time = 0;
        var startspecs = SPECS.castle.reduce((acc, {n, start}) => {acc[n] = start; return acc;}, {});
        this.life = startspecs['life'];
        this.power = startspecs['power'];
        this.speed = startspecs['speed'];
        this.timer = startspecs['timer'];
        this.soldierpower = startspecs['soldierpower'];
        this.soldierlife = startspecs['soldierlife'];
        this.range = startspecs['range'];
        this.sprite = SpriteEngine.GenCastleSprite();
        this.pos = G.Point(pos);
        this.game = game;
        game.objects.push(this);
    }
    update(time){
        var timepassed = (time - this.time) / 1000;
        var tr = this.timer == 0 ? 0.001 : 1/this.timer;
        if(this.life < 0){
            this.game.gameover = true;
        }
        this.game.castleHealthDom.innerHTML = `${this.life}`;
        if(timepassed > tr){
            var mobs = this.game.objects.filter( x=> x instanceof Enemy  && x.pos.distance(this.pos) < this.range );
            mobs = mobs.sort((a, b) => {
                return a.pos.distance(this.pos) - b.pos.distance(this.pos);
            });
            if(mobs.length > 0){
                var mob = mobs[0];
                var b = new Bullet(this,this.pos,mob.pos);
            }
            this.time = time;
        }
    }
    draw(ctx){
        ctx.drawImage(this.sprite, this.pos.x - this.sprite.w / 2, this.pos.y - this.sprite.h/2);
    }
    openTowerPage(tower){
        this.game.buildingmode = false;
        var container = this.game.footer.querySelector('#castlepagecontainer');
        container.innerHTML = 'show tower specs';
        var table = G.GenTable(5,3);
        var entities = table.entities;
        var attributes = [
            {n:`range`, cost: 0, increment: 0},
            {n:`power`, cost: 0, increment: 0},
            {n:`speed`, cost: 0, increment: 0},
            {n:`rate`, cost: 0, increment: 0},
        ];
        for(let i in attributes){
            var attr = attributes[i];
            var current = tower.getAttr(attr.n);
            var specs = SPECS.tower.find(x=>x.n == attr.n);
            var costformula = specs.costformula;
            attr.cost = parseInt(eval(costformula.replace('value',current)));
            attr.increment = specs.increment;
            entities[i][0].innerHTML = `<span class=tdt > ${attr.n.toUpperCase()}: &nbsp; <span>`;
            entities[i][1].innerHTML = `${current.toFixed(1)}`;
            if(current >= specs.max){
                entities[i][2].innerHTML = `<button>MAX</button>`;
            }
            else{
                entities[i][2].innerHTML = `<button>${this.game.parseNum(attr.cost)}$</button>`;
                entities[i][2].onclick = ()=>{
                    var attr = attributes[i];
                    if(this.game.cash >= attr.cost){
                        this.game.cash -= attr.cost;
                        var c = tower.getAttr(attr.n);
                        tower.setAttr(attr.n, parseFloat(c + attr.increment));
                        this.openTowerPage(tower);
                    }
                };
            }
        }
        container.innerHTML = ``;
        var t2 = G.GenTable(1,2);
        if(this.game.windowaspect > 1){
            t2.entities[0][0].append(table);
        }
        else{
            t2.entities[0][0].append(tower.sprite);
            t2.entities[0][1].append(table);
        }
        container.appendChild(t2);
    }
    showConfigPage(container){
        var table = G.GenTable(6,3);
        var entities = table.entities;
        entities[0][0].innerHTML = '<span class=tdt > Music </span>';
        entities[1][0].innerHTML = '<span class=tdt > Sound </span>';
        entities[2][0].innerHTML = '<span class=tdt > Difficulty </span>';
        
        entities[0][1].innerHTML = `${this.game.config.music ? 'ON' : 'OFF'}`;
        entities[1][1].innerHTML = `${this.game.config.sound ? 'ON' : 'OFF'}`;
        entities[2][1].innerHTML = `${this.game.config.playrate}x`;
        entities[0][1].onclick = ()=>{
            var ov = this.game.config.music;
            if(ov == true) this.game.SoundSystem.stopBgm();
            else this.game.SoundSystem.startBgm(this.game.config.song);
            this.game.config.music = !ov;
            this.showConfigPage(container);
        }
        entities[1][1].onclick = ()=>{
            var ov = this.game.config.sound;
            this.game.config.sound = !ov;
            this.showConfigPage(container);
        }
        entities[2][1].onclick = ()=>{
            var ov = this.game.config.playrate;
            if(ov >= 3) ov = 1; else ov += 1;
            this.game.config.playrate = ov;
            this.showConfigPage(container);
        }

        entities[3][0].innerHTML = '<span class=tdt > Song </span>';
        entities[3][1].innerHTML = this.game.config.song == 1 ? 'Peace' : 'war';
        entities[3][1].onclick = ()=>{
            this.game.config.song = this.game.config.song == 1 ? 2 : 1;
            var mo = this.game.config.music;
            if(mo){
                this.game.SoundSystem.startBgm(this.game.config.song);
            }
            this.showConfigPage(container);
        }

        if(this.game.cash != Infinity){
            entities[4][0].innerHTML = '<span class=tdt > InfinityCash </span>';
            entities[4][1].innerHTML = 'OFF';
            entities[4][1].onclick = ()=>{
                this.game.cash = Infinity;
                this.showConfigPage(container);
            }
        }

        entities[5][0].innerHTML = '<button>Menu</button>';
        entities[5][0].colSpan = 3;
        entities[5][1].remove();
        entities[5][0].onclick = ()=>{
            this.game.showMenu();
        }
        container.innerHTML = ``;
        container.append(table);
    }
    getAttr(name){
        switch(name){
            case 'life' : return this.life;
            case 'power' : return this.power;
            case 'speed' : return this.speed;
            case 'timer' : return this.timer;
        }
        return 0;
    }
    setAttr(name,val){
        switch(name){
            case 'life' :  this.life = val;break;
            case 'power' : this.power = val;break;
            case 'speed' : this.speed = val;break;
            case 'timer' : this.timer = val;break;
        }
    }
    showCastleUpgradePage(container){
        var table = G.GenTable(5,3);
        var entities = table.entities;
        var attributes = [
            {n:`life`, cost: 0, increment: 0},
            {n:`power`, cost: 0, increment: 0},
            {n:`speed`, cost: 0, increment: 0},
            {n:`timer`, cost: 0, increment: 0},
        ];
        for(let i in attributes){
            var attr = attributes[i];
            var current = this.getAttr(attr.n);
            var specs = SPECS.castle.find(s => s.n == attr.n);
            if(specs==null) continue;
            var costformula = specs.costformula;
            attr.cost = parseInt(eval(costformula.replace('value',current)));
            attr.increment = specs.increment;
            entities[i][0].innerHTML = `<span class=tdt > ${attr.n.toUpperCase()}: &nbsp; <span>`;
            entities[i][1].innerHTML = `${current.toFixed(1)}`;
            if(current >= specs.max){
                entities[i][2].innerHTML = `<button>MAX</button>`;
            }
            else{
                entities[i][2].innerHTML = `<button>${this.game.parseNum(attr.cost)}$</button>`;
                entities[i][2].onclick = ()=>{
                    var attr = attributes[i];
                    if(this.game.cash >= attr.cost){
                        this.game.cash -= attr.cost;
                        var c = this.getAttr(attr.n);
                        this.setAttr(attr.n, parseFloat(c + attr.increment));
                        this.showCastleUpgradePage(container);
                    }
                };
            }
        }
        var closeBtn = G.makeDom('<span class="closebtn">❌</span>');
        closeBtn.onclick = ()=>{
            this.game.dialog.remove();
        }
        container.innerHTML = ``;
        container.appendChild(G.makeDom('<div>castle upgrage</div>'));
        container.appendChild(closeBtn);
        container.appendChild(table);
    }
    showTowerUpgradePage(container,tower){
        this.game.buildingmode = false;
        var table = G.GenTable(5,3);
        var entities = table.entities;
        var attributes = [
            {n:`life`, cost: 0, increment: 0},
            {n:`range`, cost: 0, increment: 0},
            {n:`power`, cost: 0, increment: 0},
            {n:`speed`, cost: 0, increment: 0},
            {n:`rate`, cost: 0, increment: 0},
        ];
        for(let i in attributes){
            var attr = attributes[i];
            var current = tower.getAttr(attr.n);
            var specs = SPECS.tower.find(x=>x.n == attr.n);
            var costformula = specs.costformula;
            attr.cost = parseInt(eval(costformula.replace('value',current)));
            attr.increment = specs.increment;
            entities[i][0].innerHTML = `<span class=tdt > ${attr.n.toUpperCase()}: &nbsp; <span>`;
            entities[i][1].innerHTML = `${current.toFixed(1)}`;
            if(current >= specs.max){
                entities[i][2].innerHTML = `<button>MAX</button>`;
            }
            else{
                entities[i][2].innerHTML = `<button>${this.game.parseNum(attr.cost)}$</button>`;
                entities[i][2].onclick = ()=>{
                    var attr = attributes[i];
                    if(this.game.cash >= attr.cost){
                        this.game.cash -= attr.cost;
                        var c = tower.getAttr(attr.n);
                        tower.setAttr(attr.n, parseFloat(c + attr.increment));
                        this.showTowerUpgradePage(container,tower);
                    }
                };
            }
        }
        container.innerHTML = ``;
        var t2 = G.GenTable(1,2);
        if(this.game.windowaspect > 1){
            t2.entities[0][0].append(table);
        }
        else{
            t2.entities[0][0].append(tower.sprite);
            t2.entities[0][1].append(table);
        }
        var closeBtn = G.makeDom('<span class="closebtn">❌</span>');
        closeBtn.onclick = ()=>{
            this.game.dialog.remove();
        }
        var towerworth = tower.getwor;
        var selltowerbtn = G.makeDom('<button class="selltower">Sell </button>');
        selltowerbtn.onclick = ()=>{
            this.game.cash += 10;
            this.game.objects = this.game.objects.filter(x=>x!=tower);
            this.game.dialog.remove();
        }

        container.appendChild(G.makeDom('Tower Upgrade'));
        container.appendChild(closeBtn);
        container.appendChild(t2);
        container.appendChild(selltowerbtn);
    }
    getBulletSprite(){
        return G.getEmojiSprite(`🔥`,8,1.2);
    }
}
class Game{
    constructor(c){
        this.config = {
            music : false,
            song : 1,
            sound : false,
            playrate : 1
        };
        this.resetBody();
        this.preLoading();
        this.windowaspect = window.innerHeight/window.innerWidth;
        if(this.windowaspect > 1){
            CELLSIZE = 16*2;
            GameDimR = 12;
            GameDimC = Math.floor(window.innerWidth/CELLSIZE);
        }
        G.loadImage('spritesheet.gif?'+Math.random(),img=>{
            this.cellSize = CELLSIZE;
            this.spriteEngine = new SpriteEngine(img);
            this.cursorSprite = this.spriteEngine.GenerateCursor();
            this.mousePos = {x:0,y:0};
            this.objects = [];
            this.loadingScene();
        })
        window.godmodeplease = ()=>{this.cash=Infinity}
    }
    handleClick(e){
        if(this.dialog != null){this.dialog.remove();}
        var rect = this.canvas.getBoundingClientRect();
        var x = e.clientX - rect.left + window.scrollX;
        var y = e.clientY - rect.top + window.scrollY;
        x = Math.floor(x/this.cellSize) * this.cellSize + this.cellSize / 2;
        y = Math.floor(y/this.cellSize) * this.cellSize + this.cellSize / 2;
        var pos = {x:x,y:y};
        this.mousePos = {x:x-CELLSIZE/2,y:y-CELLSIZE/2};
        
        if(this.castle.pos.distance(pos) == 0){
            this.showCastleDialog();
        }
        if(this.gameover == true){
            this.newGame();
        }
        if(this.gamePased == true){
            this.gamePased = false;
            this.update(this.time);
        }
        var ispath = this.mazePath.find(p => p.x == x && p.y == y);
        if(ispath != null){

        }
        if(ispath == null){
            var towerOld = this.objects.find(x=> x instanceof DefenceTower && x.pos.distance(pos) == 0);
            if(towerOld){
                this.openTowerUpgrade(towerOld);
            }
            else{
                this.openTowerShop(pos);
            }
        }
        return;
    }
    resetBody(){
        var div_w_class = `<div class='_class_'></div>`;
        this.layout = G.makeDom(div_w_class.replace('_class_','layout'));
        this.header = G.makeDom(div_w_class.replace('_class_','header'));
        this.body = G.makeDom(div_w_class.replace('_class_','body'));
        this.footer = G.makeDom(div_w_class.replace('_class_','footer'));
        this.layout.appendChild(this.header);
        this.layout.appendChild(this.body);
        this.layout.appendChild(this.footer);
        document.body.innerHTML = ``;
        document.body.appendChild(this.layout);
    }
    preLoading(){
        var about = G.makeDom(`<div>Loading....</div>`);
        this.body.append(about);
    }
    gameOverScene(){
        
        this.objects = [];
        var gameovertext = new Announcement(this,`Game Over`,64,Infinity);
        gameovertext.draw(this.canvas.ctx);
        this.footer.innerHTML = 'click for new game';
        
    }
    loadingScene(){
        this.resetBody();

        var animation = this.GetAnimatedLoading();
        var about = G.makeDom(`<div>Tower Defence Game against the 13s</div>`);
        var btn = G.makeDom(`<div><button id="newGame">New Game</button></div>`);
        this.body.innerHTML = ``;
        
        this.body.append(animation);
        this.body.append(about);
        this.body.append(btn);
        
        btn.addEventListener('click',x=> this.newGame());
    }
    midLevelScene(nextLevel){
        this.objects = [];
        var canvas2 = G.makeCanvas(this.canvas.w,this.canvas.h);
        var size = 32;
        var lines = [
            G.getTextSprite(`Level ${nextLevel-1}`,size, 'red'),
            G.getTextSprite(`Completed`,size, 'green'),
            G.getTextSprite(`click for `,size, '#00'),
            G.getTextSprite(`next level`,size, '#000'),
        ]
        var sy = size;
        var vx = this.windowaspect > 1 ? 0 : size*2;
        for(let i = 0 ; i < lines.length;i++){
            var s = lines[i];
            canvas2.ctx.drawImage(s,
                vx,
                sy
            );
            sy+= size*1.2;
        }
        canvas2.addEventListener('click',(e)=>{
            this.newLevel(nextLevel);
        })
        this.body.innerHTML = '';
        this.body.appendChild(canvas2);
    }
    initGame0(){
        this.gamePased = false;
        this.level = 0;
        this.enemyTimer = 0;
        this.enemyTimerInterval = 10;
        this.enemySprite = this.spriteEngine.mob;
        this.enemies = [];
    }
    normalizePath(path){
        var normalizedPath = [];
        path.forEach(p=>{
            var [r,c] = p;
            var x = c * this.cellSize + this.cellSize / 2;  
            var y = r * this.cellSize + this.cellSize / 2;
            normalizedPath.push({x:x,y:y});
        })
        return normalizedPath;
    }
    newLevel(level){
        if(this.SoundSystem) this.SoundSystem.stopBgm();
        if(this.config.music) this.SoundSystem.startBgm(this.config.song);
        this.objects = [this.castle];
        this.wave = 1;
        this.level = level;
        var cellSize = this.cellSize;
        this.maze = new TowerDefenceMapGen(GameDimR,GameDimC,[0,0],[GameDimR-1,GameDimC-1] );
        this.mazePath = this.normalizePath(this.maze.path);
        this.mapBg = this.genMap(GameDimR,GameDimC,cellSize,this.maze.grid);
        this.canvas = G.makeCanvas(GameDimC*cellSize,GameDimR*cellSize);
        var mobgen = new MobGenerator(this,this.mazePath);
        this.body.innerHTML = '';
        this.body.appendChild(this.canvas);
        this.canvas.addEventListener('click',(e)=>{
            this.handleClick(e);
        });
        /*var events = [`mousemove`,`touchmove`];
        events.forEach(event=>{
            this.canvas.addEventListener(event,(e)=>{
                var rect = this.canvas.getBoundingClientRect();
                var x = e.clientX - rect.left + window.scrollX;
                var y = e.clientY - rect.top + window.scrollY;
                x = Math.floor(x/this.cellSize) * this.cellSize;
                y = Math.floor(y/this.cellSize) * this.cellSize;
                this.mousePos = {x:x,y:y};
            });
        })*/
    }
    newGame(){
        document.body.requestFullscreen();
        this.windowaspect = window.innerHeight/window.innerWidth;
        if(this.windowaspect > 1){
            CELLSIZE = 16*2;
            GameDimR = 12;
            GameDimC = Math.floor(window.innerWidth/CELLSIZE);
        }

        this.SoundSystem = new SoundSystem();
        this.objects = [];
        this.wave = 1;
        this.level = 1;
        this.cash = 50;
        this.gameover = false;
        this.gamePased = false;
        this.selectedTowerType = 1;
        var norm = this.normalizePath([[GameDimR-1,GameDimC-1]]);
        this.castle = new Castle(this, norm[0]);
        this.resetBody();
        this.newLevel(this.level);
        var headerTable = G.GenTable(2,6);
        headerTable.style.width = GameDimC * CELLSIZE + "px";
        var entities = headerTable.entities;
        this.waveprogressdom = document.createElement('div');
        this.wavedom = document.createElement('div');
        this.leveldom = document.createElement('div');
        this.cashdom = document.createElement('div');
        this.timedom = document.createElement('div');
        this.castleHealthDom = document.createElement('div');
        this.menuDom = document.createElement('div');

        entities[0][0].append(G.getEmojiSprite('💲',32,1.4));
        entities[1][0].append(this.cashdom);
        entities[0][1].append(G.getEmojiSprite('🏰',32,1.4));
        entities[1][1].append(this.castleHealthDom);
        entities[0][2].append(G.getEmojiSprite('🎯',32,1.4));
        entities[1][2].append(this.waveprogressdom);
        entities[0][3].append(`Wave`);
        entities[1][3].append(this.wavedom);
        entities[0][4].append(`Level`);
        entities[1][4].append(this.leveldom);

        entities[0][5].rowSpan = 2;
        entities[0][5].append(G.getEmojiSprite('📋',40,1.4));
        entities[1][5].remove();
        entities[0][5].onclick = ()=>{this.showMenu();}

        this.header.append(headerTable);
        if(this.notFirstGame == null){
            this.notFirstGame = true;
            this.ApplyMenuItem('help');
        }
        this.update(0);
    }
    openTowerShop(pos){
        if(this.dialog != null){this.dialog.remove();}
        this.dialog = Object.assign(document.createElement('div'), { className: 'inGameDialog'});
        var w = this.cellSize*3.2;
        var h = this.cellSize*2;

        this.dialog.style.top =   Math.max(pos.y - h,0) + `px`;
        this.dialog.style.left =  Math.max(pos.x - w,0) + `px`;

        var towers = [
            {s : G.imgToCanvas(this.spriteEngine.redtower) , c : 10},
            {s : G.imgToCanvas(this.spriteEngine.bluetower) , c : 20},
            {s : G.imgToCanvas(this.spriteEngine.blueredtower) , c : 30},
            {s : G.imgToCanvas(this.spriteEngine.zaptower) , c : 40},
        ]
        var table = G.GenTable(2,4);
        for(let i = 0 ; i < towers.length;i++){
            var t = towers[i];
            table.entities[0][i].appendChild(t.s);
            table.entities[1][i].innerHTML = `${t.c}$`;
            table.entities[0][i].onclick = ()=>{
                var t = towers[i];
                if(this.cash >= t.c ){
                    this.cash -= t.c;
                    var tower = new DefenceTower(this,pos,i+1);
                    this.objects.push(tower);
                    this.dialog.remove();
                    this.buildingmode = false;
                }
            }
        }
        this.dialog.append(table);
        this.buildingmode = true;
        this.body.append(this.dialog);
    }
    openTowerUpgrade(tower){
        if(this.dialog != null){this.dialog.remove();}
        this.dialog = Object.assign(document.createElement('div'), { className: 'inGameDialog'});
        var w = 180;
        var h = 100;
        this.dialog.style.top =     Math.max(tower.pos.y - h,0) + `px`;
        this.dialog.style.left =    Math.max(tower.pos.x - w,0) + `px`;
        this.castle.showTowerUpgradePage(this.dialog,tower);
        this.body.append(this.dialog);
    }
    showCastleDialog(){
        if(this.dialog != null){this.dialog.remove();}
        this.dialog = Object.assign(document.createElement('div'), { className: 'inGameDialog'});
        var w = 200;
        var h = 150;

        this.dialog.style.width =  `${w}px`;
        this.dialog.style.height = `${h}px`;

        this.castle.showCastleUpgradePage(this.dialog);
        this.dialog.style.top =     Math.max(this.castle.pos.y - h,0) + `px`;
        this.dialog.style.left =    Math.max(this.castle.pos.x - w,0) + `px`;

        this.body.append(this.dialog);
    }
    showMenu(){
        this.gamePased = true;
        if(this.dialog != null){this.dialog.remove();}
        this.dialog = Object.assign(document.createElement('div'), { className: 'menuDialog'});
        var nav = G.GenTable(8,1);
        var navItems = [
            {html : '<button >Resume</button>', f:'resume'},
            {html : '<button >Help</button>',   f:'help'},
            {html : '<button >Config</button>', f:'config'},
            {html : '<button >Quit</button>',   f:'quit'},
        ];
        for(let i in navItems){
            nav.entities[i][0].innerHTML = navItems[i].html;
            nav.entities[i][0].onclick = ()=>{
                this.ApplyMenuItem(navItems[i].f);
            }
        }
        this.dialog.append(nav);
        this.body.append(this.dialog);
    }
    ApplyMenuItem(item){
        if(item == 'resume'){
            this.gamePased = false;
            this.dialog.remove();
            this.update(this.time);
        }
        else if(item == 'quit'){
            this.gamePased = true;
            document.exitFullscreen();
            this.dialog.remove();
            this.loadingScene();

        }
        else if(item == `config`){
            this.gamePased = true;
            if(this.dialog != null){this.dialog.remove();}
            this.dialog = Object.assign(document.createElement('div'), { className: 'menuDialog'});
            this.castle.showConfigPage(this.dialog);
            this.body.append(this.dialog);

        }
        else if(item == `help`){
            this.gamePased = true;
            if(this.dialog != null){this.dialog.remove();}
            this.dialog = Object.assign(document.createElement('div'), { className: 'menuDialog'});
            this.dialog.style.width = `${this.canvas.w}px`;
            var h2 = `
                <div class="helpDiv">
                    <h2>Help</h2>
                    <p>Defend your castle against the marching 13s</p>
                    <p>Place towers and upgrade them</p>
                    <p>You can also use the castle as tower and upgrade it</p>
                    <p>you will face 13 waves each level then new map</p>
                    <p>you keep the castle upgrades but lose towers</p>
                    <p>you keep the castle upgrades but lose towers</p>
                </div>
            `;
            var mdom = G.makeDom('<button>Resume</button>');
            mdom.onclick = ()=>{
                this.gamePased = false;
                this.dialog.remove();
                this.update(this.time);
            }
            this.dialog.innerHTML += h2;
            var helpDiv = this.dialog.querySelector('.helpDiv');
            helpDiv.style['overflow-y'] = `scroll`;
            helpDiv.style.height = this.canvas.h * 0.8  + `px`;
            this.dialog.append(mdom);
            this.body.append(this.dialog);
        }
    }
    genMap(rows,cols, cellSize, grid){
        var grass = G.randomPattern('#2d7d00','#509e26',0.1,cellSize,cellSize);
        var dirt = G.randomPattern('#924200','#3d1c00',0.01,cellSize,cellSize);
        var canvas = G.makeCanvas(cols*cellSize,rows*cellSize);
        var ctx = canvas.ctx;
        for(let i = 0 ; i < rows ; i++){
            var row = grid[i];
            for(let j = 0 ; j < cols ; j++){
                var s = row[j] == true ? dirt : grass;
                ctx.drawImage(s,
                    j*s.width,
                    i*s.height
                );
            }
        }
        return canvas;
    }
    parseNum(v){
        if(v >= 10000000000) return `${(v/10000000000).toFixed(1)}T`;
        if(v >= 100000000) return `${(v/100000000).toFixed(1)}B`;
        if(v >= 1000000) return `${(v/1000000).toFixed(1)}M`;
        if(v >= 1000) return `${(v/1000).toFixed(1)}k`;
        return `${v}`;
    }
    update(t){
        if(this.gameover == true) return this.gameOverScene();
        var tins = parseInt(t/1000);
        this.timedom.innerHTML = `${this.parseTime(tins)}`;
        this.cashdom.innerHTML = `${this.parseNum(this.cash)}`;
        if(this.gamePased == true){return;}
        this.canvas.clear();
        this.canvas.ctx.drawImage(this.mapBg,0,0);
        for(let i = 0 ; i < this.config.playrate;i++){
            this.objects.forEach(x=> x.update(t + i*1000));
        }
        this.objects.sort((a, b) => {
            const aY = a.pos ? a.pos?.y : Infinity;
            const bY = b.pos ? b.pos?.y : Infinity;
            return aY - bY;
        });
        this.objects.forEach(x=> x.draw(this.canvas.ctx));
        this.canvas.ctx.drawImage(this.cursorSprite,
            this.mousePos.x,
            this.mousePos.y,
        );
        this.time = t;
        requestAnimationFrame(x=>this.update(x));
    }
    parseTime(s){
        let m = Math.floor(s / 60);
        let h = Math.floor(m / 60);
        h = h == 0 ? '' : h < 10 ? `0${h}:` : `${h}:`;
        m = Math.floor(m % 60);
        m = m == 0 ? '' : m < 10 ? `0${m}:` : `${m}:`;
        s = Math.floor(s % 60);
        return `${h}${m}${s}`;
    }
    GetAnimatedLoading(){
        var canvas = G.makeCanvas(CELLSIZE * 10,CELLSIZE * 6);
        var sky = G.randomPattern('#82e9e1','#82E9E8',0.01,canvas.w,canvas.h);
        var dirt = G.randomPattern('#904a00','#c46400',0.01,canvas.w,CELLSIZE/2);
        var castle = G.getEmojiSprite(`🏰`,CELLSIZE*2,1.1);
        var animations = this.spriteEngine.mobAnimations;
        var animFrame = 0;
        var sx = canvas.w;
        var cy = canvas.h - castle.h;
        function updateCanvas(t){
            canvas.ctx.drawImage(sky, 0, 0);
            canvas.ctx.drawImage(dirt, 0, canvas.h - dirt.h);
            var credit = G.getTextSprite(`BY MHMDJAWADZD`,   18, `#fff`, 1.5);
            var s = animations[parseInt(animFrame/10)];
            canvas.ctx.drawImage(credit, sx + s.w , canvas.h - credit.h);
            canvas.ctx.drawImage(castle, 0, cy);
            canvas.ctx.drawImage(s, sx, canvas.h - s.h);
            if(sx <= s.w){
                cy++;
            }
            else{
                sx += -1;
            }
            animFrame++;if(animFrame >= 30) animFrame = 0;
            var texts = [
                G.getTextSprite(`Tower Defence Game:`,   16, 'blue', 1.5),
                G.getTextSprite(`Walking Thirteens `,   18, G.randomColor(), 1.5),
                G.getTextSprite(`JS13k-2024`,   18, 'red', 1.5),
            ];
            for(let i = 0 ; i < texts.length;i++){
                canvas.ctx.drawImage(texts[i], i*5 , CELLSIZE/2 * i);
            }
            
            if(cy > canvas.h) {
                return;
            }
            if(t /1000 > 30) return;
            requestAnimationFrame(updateCanvas);
        }
        requestAnimationFrame(updateCanvas);
        return canvas;
    }
}
document.addEventListener('DOMContentLoaded', function () {
    window.game = new Game("body");
}, false);