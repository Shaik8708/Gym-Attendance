
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.3.min.js'; // Check https://jquery.com/ for the current version
document.getElementsByTagName('head')[0].appendChild(script);

class UpdateCellRenderer {
    eGui;
    params;
  
    init(params) {
      this.eGui = document.createElement('div');
      this.eGui.innerHTML = `<button type="button" class="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Update
    </button>`;
      this.eGui.addEventListener('click', () => this.invokeParentModelDialogMethod());
      this.params = params;
    }
  
    getGui() {
      return this.eGui;
    }
  
    refresh() {
      return false;
    }
  
    invokeParentModelDialogMethod() {
      const { node } = this.params;
        $('#exampleModal').show();
        editForm(node.data);
    }
  }