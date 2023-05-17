class PlantCard extends HTMLElement {
    setConfig(config) {
      this._config = config;
      this.render();
    }
  
    render() {
      const { image, entities } = this._config;
  
      const cardContainer = document.createElement('div');
      cardContainer.style.backgroundImage = `url(${image})`;
      cardContainer.style.backgroundSize = 'cover';
      cardContainer.style.backgroundPosition = 'center';
      cardContainer.style.width = '100%';
      cardContainer.style.height = '100%';
  
      entities.forEach(entity => {
        const entityElement = document.createElement('div');
        entityElement.textContent = entity.entity;
        entityElement.style.color = this.getTextColor(entity);
        cardContainer.appendChild(entityElement);
      });
  
      this.innerHTML = '';
      this.appendChild(cardContainer);
    }
  
    getTextColor(entity) {
      const { min, max } = entity;
      const state = this.getHass().states[entity.entity].state;
      return state < min || state > max ? 'red' : 'var(--primary-text-color)';
    }
  
    set hass(hass) {
      this._hass = hass;
    }
  
    getCardSize() {
      return 1;
    }
  }
  
  customElements.define('plant-card', PlantCard);
  