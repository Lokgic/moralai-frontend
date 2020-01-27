export default class SequenceLogic {
  constructor(props) {
    // this.featureTranslator = props.featureTranslator;
    this.featureDict = props.featureDict;
    this.valueTranslator = props.valueTranslator;
    this.seq = props.randomized ? this.seqRandomizer(props.seq) : props.seq;
    this.current = -1;
    this.getCurrentIndex = this.getCurrentIndex.bind(this);
    this.getCurrent = this.getCurrent.bind(this);
    this.getNext = this.getNext.bind(this);
    // this.valueTranslator = this.valueTranslator.bind(this);
  }
  seqRandomizer = seq => {
    let out = [...seq];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }

    return out.map(d => (Math.random() > 0.5 ? [d[1], d[0]] : d));
  };
  translateFeature = fkey => this.featureDict[fkey];
  translateValue = (fkey, val) => this.valueTranslator(fkey, val);
  getCurrentIndex() {
    if (this.current === -1) {
      this.current = 0;
    }
    return this.current;
  }
  getCurrent() {
    if (this.current === -1) {
      this.current = 0;
    }
    return this.seq[this.current];
  }
  getFeatureKeys() {
    if (this.current === -1) {
      this.current = 0;
    }
    return Object.keys(this.seq[this.current][0]);
  }
  getNext() {
    if (this.current === -1) {
      this.current = 1;
    } else if (this.current < this.seq.length - 1) {
      this.current += 1;
    }
    return this.getCurrent();
  }
  checkDataStatus = dataArray => dataArray.length === this.seq.length;
}
