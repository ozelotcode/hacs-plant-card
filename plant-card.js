class PlantCard extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this.render();
  }

  render() {
    const { image, name, entities } = this._config;

    const cardContainer = document.createElement('ha-card');
    cardContainer.style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(30, 30, 30, 0.44) 52.08%, #1E1E1E 100%), url(${image})`;
    cardContainer.style.backgroundSize = 'cover';
    cardContainer.style.backgroundPosition = 'center';
    cardContainer.style.height = '100%';
    cardContainer.style.border = '0';

    const cardContent = document.createElement('div');
    cardContent.style.padding = '0 12px';
    cardContent.style.display = 'flex';
    cardContent.style.flexDirection = 'column';
    cardContent.style.position = 'relative';
    cardContent.style.bottom = '-25px';

    const plantName = document.createElement('div');
    plantName.textContent = name;
    plantName.style.fontWeight = '700';
    plantName.style.fontSize = '20px';
    plantName.style.lineHeight = '19px';
    plantName.style.color = '#FFFFFF';
    plantName.style.textShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
    plantName.style.overflowWrap = 'break-word';
    cardContent.appendChild(plantName);

    const lineContainer = document.createElement('div');
    lineContainer.style.display = 'flex';
    lineContainer.style.alignItems = 'center';

    entities.forEach(entity => {
      const stateObj = this._config.hass ? this._config.hass.states[entity.entity] : undefined;
      const state = stateObj ? stateObj.state : undefined;

      const entityContainer = document.createElement('div');
      entityContainer.style.display = 'flex';
      entityContainer.style.alignItems = 'center';
      entityContainer.style.marginTop = '8px';

      const valueElement = document.createElement('div');
      valueElement.textContent = state !== undefined ? state : '0';
      valueElement.style.fontStyle = 'normal';
      valueElement.style.fontWeight = '600';
      valueElement.style.fontSize = '14px';
      valueElement.style.lineHeight = '17px';
      valueElement.style.color = state >= entity.min && state <= entity.max ? '#FFFFFF' : 'red';
      valueElement.style.textShadow = '0px 4px 4px rgba(0, 0, 0, 0.25)';
      valueElement.style.marginLeft = '5px';
      valueElement.style.marginRight = '8px';

      if (entity.valueType === 'humidity') {
        const humidityIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        humidityIcon.setAttribute('width', '11px');
        humidityIcon.setAttribute('height', '17px');
        humidityIcon.setAttribute('viewBox', '0 0 11 17');
        humidityIcon.style.filter = 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))';
        humidityIcon.innerHTML = `
        <path d="M5.67254 17C4.89105 16.997 4.14264 16.6852 3.59008 16.1329C3.03752 15.5803 2.72593 14.8317 2.72295 14.0504C2.72295 12.655 4.76504 8.94517 5.17341 8.20774C5.28499 8.04136 5.47215 7.94165 5.67257 7.94165C5.87298 7.94165 6.06013 8.04136 6.17172 8.20774C6.58006 8.94512 8.62219 12.655 8.62219 14.0504C8.61922 14.8317 8.30762 15.5803 7.75506 16.1329C7.20249 16.6852 6.45403 16.997 5.67259 17H5.67254ZM5.67254 9.68249C4.86259 11.0446 4.25143 12.5154 3.85734 14.0504C3.85734 14.699 4.20337 15.2982 4.76484 15.6225C5.32652 15.9467 6.01856 15.9467 6.58024 15.6225C7.14172 15.2982 7.48774 14.699 7.48774 14.0504C7.09364 12.5153 6.48249 11.0446 5.67254 9.68249Z" fill="white"/>
        <path d="M2.26905 9.05851C1.66721 9.05851 1.09013 8.81951 0.664543 8.39396C0.238954 7.96841 0 7.3913 0 6.78966C0 5.75732 1.4749 3.06845 1.76987 2.53529C1.88145 2.3689 2.06861 2.2692 2.26902 2.2692C2.46924 2.2692 2.65639 2.36891 2.76818 2.53529C3.06316 3.06845 4.53804 5.75732 4.53804 6.78966C4.53804 7.3913 4.29885 7.96837 3.8733 8.39396C3.44794 8.81952 2.87089 9.05851 2.26905 9.05851ZM2.26905 4.02148C1.7604 4.88507 1.37816 5.81728 1.13445 6.78966C1.13445 7.19483 1.35069 7.56937 1.70185 7.77211C2.05282 7.9747 2.48531 7.9747 2.83625 7.77211C3.18722 7.56932 3.40345 7.19483 3.40345 6.78966C3.1597 5.81728 2.7777 4.88507 2.26905 4.02148Z" fill="white"/>
        <path d="M7.94154 6.78951C7.3397 6.78951 6.76262 6.55032 6.33704 6.12477C5.91148 5.69941 5.67249 5.12231 5.67249 4.52046C5.67249 3.48812 7.14739 0.799259 7.44236 0.266096C7.55394 0.0997092 7.7411 0 7.94152 0C8.14173 0 8.32889 0.0997142 8.44067 0.266096C8.73565 0.799259 10.2105 3.48812 10.2105 4.52046C10.2105 5.12231 9.97135 5.69938 9.54579 6.12477C9.12044 6.55032 8.54338 6.78951 7.94154 6.78951ZM7.94154 1.75229C7.43289 2.61588 7.05066 3.54809 6.80694 4.52046C6.80694 4.92584 7.02318 5.30033 7.37434 5.50292C7.72531 5.70551 8.1578 5.70551 8.50874 5.50292C8.85967 5.30033 9.07594 4.92579 9.07594 4.52046C8.8322 3.54809 8.45019 2.61588 7.94154 1.75229Z" fill="white"/>
        `;
        entityContainer.appendChild(humidityIcon);
      } else if (entity.valueType === 'fertility') {
        const fertilityIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        fertilityIcon.setAttribute('width', '9px');
        fertilityIcon.setAttribute('height', '15px');
        fertilityIcon.setAttribute('viewBox', '0 0 9 15');
        fertilityIcon.style.filter = 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))';
        fertilityIcon.innerHTML = `
        <path d="M1.7838 0.259521C1.15182 0.259521 0.630447 0.780891 0.630447 1.41287C0.630447 2.04485 1.15182 2.56622 1.7838 2.56622H1.8527V11.889C1.8527 13.3488 3.0398 14.5403 4.49984 14.5403C5.95989 14.5403 7.14782 13.3488 7.14782 11.889V2.56622H7.21591C7.84789 2.56622 8.36926 2.04485 8.36926 1.41287C8.36926 0.780891 7.84789 0.259521 7.21591 0.259521H1.7838ZM1.7838 1.10033H7.2159C7.39707 1.10033 7.53255 1.2317 7.53255 1.41287C7.53255 1.59404 7.39708 1.72622 7.2159 1.72622H1.7838C1.60262 1.72622 1.47126 1.59404 1.47126 1.41287C1.47126 1.2317 1.60262 1.10033 1.7838 1.10033ZM2.69271 2.56622H6.30771V11.889C6.30771 12.8983 5.50884 13.7003 4.49973 13.7003C3.49062 13.7003 2.69259 12.8983 2.69259 11.889V11.6659L3.26025 11.666C3.48853 11.6609 3.67098 11.4743 3.67098 11.246C3.67098 11.0176 3.48852 10.8311 3.26025 10.826H2.69259V10.1534H4.10025C4.21322 10.1558 4.32255 10.1127 4.40331 10.0336C4.48417 9.9546 4.52964 9.84632 4.52964 9.73335C4.52964 9.62026 4.48417 9.51198 4.40331 9.43299C4.32257 9.35389 4.21323 9.31076 4.10025 9.31334H2.69259V8.64302H3.26025C3.37322 8.6456 3.48255 8.60247 3.56331 8.52337C3.64417 8.44439 3.68964 8.3361 3.68964 8.22301C3.68964 8.11004 3.64417 8.00176 3.56331 7.92277C3.48257 7.84367 3.37323 7.80054 3.26025 7.803H2.69259V7.13364H4.10025C4.3324 7.13364 4.52061 6.94544 4.52061 6.71328C4.52061 6.48113 4.33241 6.29292 4.10025 6.29292H2.69259V5.62356H3.26025C3.37322 5.62602 3.48255 5.5829 3.56331 5.5038C3.64417 5.42481 3.68964 5.31653 3.68964 5.20356C3.68964 5.09047 3.64417 4.98219 3.56331 4.9032C3.48257 4.8241 3.37323 4.78097 3.26025 4.78355H2.69259V4.11008H4.10025V4.10996C4.21322 4.11254 4.32255 4.06941 4.40331 3.99031C4.48417 3.91133 4.52975 3.80305 4.52975 3.68995C4.52975 3.57698 4.48417 3.4687 4.40331 3.38971C4.32257 3.31061 4.21323 3.26749 4.10025 3.26995H2.69259L2.69271 2.56622Z" fill="white"/>
        `;
        entityContainer.appendChild(fertilityIcon);
      }

      entityContainer.appendChild(valueElement);
      lineContainer.appendChild(entityContainer);
    });

    cardContent.appendChild(lineContainer);
    cardContainer.appendChild(cardContent);

    this.innerHTML = '';
    this.appendChild(cardContainer);
  }

  set hass(hass) {
    this._config = Object.assign({}, this._config, { hass });
    this.render();
  }

  getCardSize() {
    return 1;
  }
}

customElements.define('plant-card', PlantCard);
