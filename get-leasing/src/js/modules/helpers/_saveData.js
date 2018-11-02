export default function saveData() {
  
  this.data = null;
  this.setData = (data) => {
    this.data = Object.assign({}, data);
  };
  this.getData = () => {
  	return this.data;
  };

}
