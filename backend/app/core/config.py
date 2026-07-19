from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    VT_API_KEY: str

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    WAZUH_API_URL: str
    WAZUH_USERNAME: str
    WAZUH_PASSWORD: str
    WAZUH_INDEXER_URL: str
    WAZUH_INDEXER_USERNAME: str
    WAZUH_INDEXER_PASSWORD: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()